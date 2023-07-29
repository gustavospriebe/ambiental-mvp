interface GreetingsProps {
    name: string;
    email: string;
}

const Greetings = async ({ info }: any) => {
    return (
        <div className="w-full py-4 relative">
            <div className="mb-4">
                <h1 className="text-3xl text-gray-700 font-bold mb-4">
                    Hello {info.name}
                </h1>
                <h4 className="text-xl text-gray-400">
                    Check your daily tasks and schedule
                </h4>
            </div>
            <div>
                <div>Todays Schedule</div>
                <div>{info.email}</div>
            </div>
        </div>
    );
};

export default Greetings;
