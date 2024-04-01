

const ClockInPage =({PlayerNameReceieved}) => {

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Get the value entered in the tea input field
        const enteredPlayerName = e.target.elements.playerName?.value?.trim()
    

        PlayerNameReceieved(enteredPlayerName);
         

    
      };


    return (
        <div>
          <h1>Welcome!</h1>
          <h3>Enter your name below:</h3>
          <form onSubmit={handleSubmit}>
              <div>
                <label>Name:
                  <input name="playerName" />

                </label>

              </div>

              <button type="submit">Clock In</button>
            </form>
        </div>
      );
}

export default ClockInPage;