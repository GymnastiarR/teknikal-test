import { Message } from "../atoms/message"

export const NotFound = () => {
    return (<section className="h-[72vh] flex flex-col justify-center items-center">
        <Message text="404" />
        <Message text="Not Found" />
    </section>)
}