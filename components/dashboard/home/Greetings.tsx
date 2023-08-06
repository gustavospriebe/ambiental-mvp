interface GreetingsProps {
    name: string | null | undefined;
}

const Greetings = async ({ name }: GreetingsProps) => {
    return (
        <div className=" py-4">
            <div className="mb-4">
                <h1 className="text-3xl text-gray-700 font-bold mb-4">
                    Hello {name}
                </h1>
                {/* <h4 className="text-xl text-gray-400">
                    Check your daily tasks and schedule
                </h4> */}
            </div>
            {/* <div>
                <div>Todays Schedule</div>
            </div> */}
        </div>
    );
};

export default Greetings;
