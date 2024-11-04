import Game from "@/app/components/Game";

const GamePage = async ({ params }) => {
  const { id } = await params;
  return (
    <div>
      <Game id={id} />
    </div>
  );
};

export default GamePage;
