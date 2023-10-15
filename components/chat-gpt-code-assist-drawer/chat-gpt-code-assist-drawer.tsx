import React, {
    ChangeEventHandler, createContext, Fragment, KeyboardEventHandler,
    PropsWithChildren,
    useCallback, useEffect,
    useMemo,
    useState
} from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import {
    ChatCompletionChunk,
    ChatCompletionCreateParams,
    ChatCompletionCreateParamsStreaming, ChatCompletionMessageParam
} from "openai/resources/chat";
import classNames from "classnames";
import { useRouter } from "next/router";
import dayjs from 'dayjs';

export interface ChatGptCodeAssistDrawerProps {
    //
}

export interface ChatGptCodeAssistDrawerContextValue {
    initialMessages?: Array<ChatCompletionMessageParam>,
    setInitialMessages?: (state: Array<ChatCompletionMessageParam> | ((state: Array<ChatCompletionMessageParam>) => Array<ChatCompletionMessageParam>)) => void,
    externalFunctions?: Array<ChatCompletionCreateParams.Function>,
    setExternalFunctions?: (state: Array<ChatCompletionCreateParams.Function> | ((state: Array<ChatCompletionCreateParams.Function>) => Array<ChatCompletionCreateParams.Function>)) => void,
    externalFunctionsForFunctionCall?: Record<string, Function>,
    setExternalFunctionsForFunctionCall?: (state: Record<string, Function> | ((state: Record<string, Function>) => Record<string, Function>)) => void,
    pageContext?: any,
    setPageContext?: (state: any | ((state: any) => any)) => void
    started?: boolean,
    onSend?: (messages: Array<ChatCompletionMessageParam>) => void
}

export const ChatGptCodeAssistDrawerContext = createContext<ChatGptCodeAssistDrawerContextValue>({})

let ChatGptCodeAssistDrawer: React.FC<PropsWithChildren>;
if (process.env.NODE_ENV === "development") {
    ChatGptCodeAssistDrawer = function ChatGptCodeAssistDrawer(props) {
        const {
            children
        } = props
        const {pathname, asPath, locale = 'en'} = useRouter()
        const [open, setOpen] = useState<boolean>(false)
        const [started, setStarted] = useState<boolean>(false)
        const [loading, setLoading] = useState<boolean>(false)
        const [error, setError] = useState<boolean>(false)
        const [prompt, setPrompt] = useState<string>('')
        const [role, setRole] = useState<"user" | "assistant">("user")
        const [initialMessages, setInitialMessages] = useState<Array<any>>([])
        const [messages, setMessages] = useState<Array<ChatCompletionMessageParam>>([])
        const [delta, setDelta] = useState<ChatCompletionChunk.Choice.Delta>({
            role: 'assistant',
            content: ''
        })
        const [externalFunctions, setExternalFunctions] = useState<Array<ChatCompletionCreateParams.Function>>([])
        const [externalFunctionsForFunctionCall, setExternalFunctionsForFunctionCall] = useState<Record<string, Function>>({})
        const [functionCall, setFunctionCall] = useState<ChatCompletionMessageParam.FunctionCall | null>(null)
        const [pageChanged, setPageChanged] = useState<boolean>(false)
        const [pageContext, setPageContext] = useState<any>(null)

        const systemMessage = useMemo<ChatCompletionMessageParam>(() => ({
            role: 'system',
            content: `You're working as an AI assistant for a Next.js project using TailwindCSS.\n\n
You will answer as short as possible and never include updated code in the response.\n\n
You're enable to edit code directly with write_current_page_data function.
            \n\n`
                + `Today is ${dayjs().format('dddd, DD MMMM YYYY')}`
        }), [])

        useEffect(() => {
            setPageChanged(true)
        }, [asPath]);

        const functions = useMemo(() => [
            {
                name: "read_current_page_data",
                description: "read-current-page",
                parameters: {
                    type: "object",
                    properties: {}
                }
            },
            {
                name: "write_current_page_data",
                description: "write-current-page",
                parameters: {
                    type: "object",
                    properties: {
                        content: {
                            type: 'string'
                        }
                    },
                    required: ['content']
                }
            },
            ...externalFunctions
        ], [externalFunctions])

        const onClick = useCallback(() => {
            setOpen((v) => !v)
        }, [])

        const onClose = useCallback(() => {
            setOpen(false)
        }, [])

        const textAreaRows = useMemo(() => {
            const rows = (prompt || '').split(/\r\n|\r|\n/).length;
            if (rows < 2) return 2
            if (rows > 8) return 8
            return rows
        }, [prompt])

        const onChangeTextArea = useCallback<ChangeEventHandler<HTMLTextAreaElement>>((event) => {
            setPrompt(event.target.value)
        }, [])

        const handleFunctionCall = useCallback(async (function_call: ChatCompletionMessageParam.FunctionCall) => {
            const functions: any = {
                async read_current_page_data() {
                    setPageChanged(false)
                    return await fetch('/api/code-assist/read-file', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({ path: `pages/${pathname.replace('/', '')}` })
                    })
                        .then(async (response) => {
                            if (!response.ok && response.status == 400) throw new Error((await response.json()).error.message)
                            if (!response.body || !response.ok) return response;
                            return response.json();
                        })
                        .catch((e: Error) => {
                            alert(e.message)
                            setError(true)
                        })
                        .finally(() => setLoading(false))
                },
                async write_current_page_data() {
                    return await fetch('/api/code-assist/write-file', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({ path: `pages/${pathname.replace('/', '')}`, content: JSON.parse(function_call.arguments).content })
                    })
                        .then(async (response) => {
                            if (!response.ok && response.status == 400) throw new Error((await response.json()).error.message)
                            if (!response.body || !response.ok) return response;
                            return response.json();
                        })
                        .catch((e: Error) => {
                            alert(e.message)
                            setError(true)
                        })
                        .finally(() => setLoading(false))
                },
                ...externalFunctionsForFunctionCall
            }
            const f = functions[function_call.name]
            return {
                role: 'function',
                name: function_call.name,
                content: f ? JSON.stringify(await f(JSON.parse(function_call.arguments))) : ''
            } as ChatCompletionMessageParam
        }, [pathname, externalFunctionsForFunctionCall])

        const onSend = useCallback((newMessages?: Array<ChatCompletionMessageParam>) => {
            const send = async (messages: Array<ChatCompletionMessageParam>) => {
                setMessages(messages)
                setPrompt("")
                setRole('assistant')
                setDelta((v) => ({...v, content: ''}))
                setLoading(true)
                await fetch('/api/chat/completions', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        stream: true,
                        functions: functions.length ? functions : undefined,
                        messages: [
                            ...(systemMessage ? [systemMessage] : []),
                            ...initialMessages,
                            ...messages
                        ]
                    } as ChatCompletionCreateParamsStreaming)
                })
                    .then(async (response) => {
                        if (!response.ok && response.status == 400) throw new Error((await response.json()).error.message)
                        if (!response.body || !response.ok) return response;
                        const reader = response.body.getReader()
                        let delta: ChatCompletionChunk.Choice.Delta = {}
                        let valueTemp = ''
                        const read = async () => {
                            const {value, done} = await reader.read()
                            const values = new TextDecoder().decode(value).split("\n")
                            values.forEach((value) => {
                                valueTemp += value;
                                if (!valueTemp) return;
                                try {
                                    const responseChunk = JSON.parse(valueTemp)
                                    const choice: ChatCompletionChunk.Choice = responseChunk.choices[0]
                                    if (choice.delta.function_call) {
                                        delta = {
                                            ...delta,
                                            ...choice.delta,
                                            function_call: {
                                                ...delta.function_call,
                                                ...choice.delta.function_call,
                                                arguments: (delta.function_call?.arguments || '') + (choice.delta.function_call.arguments || '')
                                            }
                                        }
                                    } else {
                                        delta = {
                                            ...delta,
                                            ...choice.delta,
                                            content: (delta.content || '') + (choice.delta.content || '')
                                        }
                                    }
                                    setDelta(delta)
                                    valueTemp = ''
                                } catch (e) {
                                    //
                                }
                            })
                            if (!done) await read().catch()
                            else {
                                setMessages((v) => [...v, delta as ChatCompletionMessageParam])
                                if (delta.function_call) {
                                    setTimeout(() => {
                                        setFunctionCall(delta.function_call as ChatCompletionMessageParam.FunctionCall)
                                    }, 250)
                                } else {
                                    setRole("user")
                                }
                            }
                        }
                        await read().catch()
                        return response;
                    })
                    .catch((e: Error) => {
                        alert(e.message)
                        setError(true)
                    })
                    .finally(() => setLoading(false))
            }
            setTimeout(() => {
                send([...messages, ...(newMessages || [])]).catch()
            }, 250);
        }, [functions, initialMessages, messages, systemMessage])

        useEffect(() => {
            if (functionCall) {
                setFunctionCall(null);
                setTimeout(async () => {
                    const d = await handleFunctionCall(functionCall)
                    onSend([d])
                }, 250)
            }
        }, [functionCall, handleFunctionCall, onSend]);

        const onClickPrompt = useCallback(async (prompt: string) => {
            if (!started) {
                setStarted(true)
                setPageChanged(false)
                onSend([
                    {role: 'user', content: prompt},
                    {
                        role: 'assistant',
                        content: null,
                        function_call: {name: 'read_current_page_data', arguments: '{}'}
                    },
                    await handleFunctionCall({name: 'read_current_page_data', arguments: '{}'})
                ])
            } else {
                onSend([{role: 'user', content: prompt}])
            }
        }, [handleFunctionCall, onSend, started])

        const onKeyDownTextArea = useCallback<KeyboardEventHandler<HTMLTextAreaElement>>((event) => {
            if (!event.shiftKey && event.code === 'Enter') {
                event.preventDefault()
                onClickPrompt(prompt)
            }
        }, [onClickPrompt, prompt])

        const onClickReadCurrentPageData = useCallback(async () => {
            setPageChanged(false)
            onSend([
                {role: 'assistant', content: null, function_call: {name: 'read_current_page_data', arguments: '{}'}},
                await handleFunctionCall({name: 'read_current_page_data', arguments: '{}'})
            ])
        }, [handleFunctionCall, onSend])

        const onClickSend = useCallback(() => {
            if (!started) onClickPrompt(prompt)
            else onSend([{role: 'user', content: prompt}])
        }, [onClickPrompt, onSend, prompt, started])

        const onClickNewChat = useCallback(() => {
            setStarted(false)
            setMessages([])
        }, [])

        useEffect(() => {
            locale && onClickNewChat()
        }, [onClickNewChat, locale]);

        const onClickRetry = useCallback(() => {
            setError(false)
            onSend()
        }, [onSend])

        const contextValue = useMemo<ChatGptCodeAssistDrawerContextValue>(() => ({
            initialMessages,
            setInitialMessages,
            pageContext,
            setPageContext,
            externalFunctions,
            setExternalFunctions,
            externalFunctionsForFunctionCall,
            setExternalFunctionsForFunctionCall,
            started,
            onSend
        }), [externalFunctions, externalFunctionsForFunctionCall, initialMessages, onSend, pageContext, started])

        const drawerClasses = open ? 'translate-x-0' : '-translate-x-full';

        return (<ChatGptCodeAssistDrawerContext.Provider value={contextValue}>
            {children}
            <div className="fixed bottom-4 right-4">
                <a href="#" onClick={onClick}
                   className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                    {'🧑‍💻'}
                </a>
            </div>
            {open &&
                <div className={`z-20 fixed top-0 right-0 h-full w-64 transform transition-transform ${drawerClasses} dark:bg-gray-800 bg-gray-200 dark:shadow-md`}>
                    <div className="absolute top-0 right-0 left-0 text-end">
                        <button onClick={onClose} className="p-2 text-gray-800 hover:text-gray-600 text-2xl mt-1 mr-2">×</button> {/* Using relative positioning */}
                    </div>
                    <div className="flex flex-col gap-4 h-full pt-10">
                        {!started && <div className="flex flex-col gap-4 flex-1 items-center justify-center"></div>}
                        {started && <>
                            <div className="flex flex-col flex-1 overflow-auto">
                                {messages.map((message, index) => (
                                    <Fragment key={`${index}`}>
                                        {message.role === 'user' && <div className="py-2 px-4">
                                            <h1 className="font-bold">{message.role}</h1>
                                            <div
                                                className={classNames(
                                                    "prose prose-sm dark:prose-invert",
                                                    "prose-p:my-2 first:prose-p:mt-0 last:prose-p:mb-0",
                                                    "prose-ol:my-2"
                                                )}>
                                                <p className="whitespace-pre-line">{message.content || ''}</p>
                                            </div>
                                        </div>}
                                        {message.role === 'assistant' && !message.function_call &&
                                            <div className="py-2 px-4 bg-gray-100 dark:bg-gray-900">
                                                <h1 className="font-bold">{message.role}</h1>
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm]}
                                                    className={classNames(
                                                        "prose prose-sm dark:prose-invert",
                                                        "prose-p:my-2 first:prose-p:mt-0 last:prose-p:mb-0",
                                                        "prose-ol:my-2"
                                                    )}
                                                >
                                                    {message?.content || ''}
                                                </ReactMarkdown>
                                            </div>}
                                        {message.role === 'function' &&
                                            <div className="py-2 px-4 bg-gray-200 dark:bg-gray-800">
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm]}
                                                    className={classNames(
                                                        "prose prose-sm dark:prose-invert",
                                                        "prose-p:my-2 first:prose-p:mt-0 last:prose-p:mb-0",
                                                        "prose-ol:my-2"
                                                    )}
                                                >
                                                    {`**[${message.name}]**`}
                                                </ReactMarkdown>
                                            </div>}
                                    </Fragment>
                                ))}
                                {loading && <div className="py-2 px-4 bg-gray-100 dark:bg-gray-900">
                                    <h1 className="font-bold">{delta.role || 'assistant'}</h1>
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        className={classNames(
                                            "prose prose-sm dark:prose-invert",
                                            "prose-p:my-2 first:prose-p:mt-0 last:prose-p:mb-0",
                                            "prose-ol:my-2"
                                        )}
                                    >
                                        {delta.content || '.'}
                                    </ReactMarkdown>
                                </div>}
                                {!loading && role === 'user' && <div className="flex gap-2 py-2 px-4">
                                    {pageChanged && (
                                        <button
                                            type="button"
                                            className="border-dashed text-left whitespace-break-spaces"
                                            onClick={onClickReadCurrentPageData}
                                        >
                                            {'read-current-page'}
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className="border-dashed text-left whitespace-break-spaces"
                                        onClick={onClickNewChat}
                                    >
                                        {'new-chat'}
                                    </button>
                                </div>}
                            </div>
                        </>}
                        <div className="flex items-end gap-4 pb-4 px-4">
                            <textarea
                                className="border rounded-lg p-2 w-full h-24 resize-none"
                                value={prompt}
                                disabled={role !== 'user' || error}
                                rows={textAreaRows}
                                onChange={onChangeTextArea}
                                onKeyDown={onKeyDownTextArea}
                            ></textarea>
                            {!error && (
                                <button
                                    type="submit"
                                    className="btn-primary"
                                    disabled={role !== 'user'}
                                    onClick={onClickSend}
                                >
                                    {'➡️'}
                                </button>
                            )}
                            {error && (
                                <button
                                    type="submit"
                                    className="btn-primary"
                                    onClick={onClickRetry}
                                >
                                    {'🔄'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>}
        </ChatGptCodeAssistDrawerContext.Provider>);
    }
} else {
    ChatGptCodeAssistDrawer = function ChatGptCodeAssistDrawer(props) {
        return props.children
    }
}

export {
    ChatGptCodeAssistDrawer
}
