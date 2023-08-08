interface GreetingsProps {
  name: string | null | undefined;
}

const Greetings = async ({ name }: GreetingsProps) => {
  return (
    <div className=" py-4">
      <div className="mb-4">
        <h1 className="mb-4 text-3xl font-bold text-gray-700">Hello, {name}!</h1>
        <h4 className="text-xl text-gray-400">
                    Confira seu dashboard
                </h4>
      </div>
      {/* <div>
                <div>Todays Schedule</div>
            </div> */}
    </div>
  );
};

export default Greetings;
