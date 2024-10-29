import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <div className="text-center display-4 mt-5">
        Getting Killed And Injured
      </div>
      <div className="text-center">
        <h2>Can You Get The Computer's 4 Numbers?</h2>
      </div>
      <hr className="bg-dark" />
      <center>
        <div className="btn btn-dark">If So, Select Your Level</div>
      </center>
      <div className="row mt-5">
        <div className="col-md-3">
          <div className="card-deck">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Bossman</h3>
                <p>7 Trials. You have 7 trials. You're the Boss</p>
                <Link href="bossman.html" target="_self">
                  <div className="btn btn-danger">Start Game</div>
                </Link>
              </div>
              <div className="card-footer">
                <h6 className="text-muted">Master</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
