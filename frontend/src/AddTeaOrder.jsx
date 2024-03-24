import { useState } from "react"

function AddTeaOrder({ defaultName, selectedTea }) {
    const [showTeaGame, setShowTeaGame] = useState(false);
    const [teaInput, setTeaInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("ADASKJDKASDJAS")
        if (selectedTea && teaInput.trim().toLowerCase() === selectedTea) {
            // Tea input matches the selected tea, perform further actions
            // For example, you can submit the form, trigger an action, etc.
            console.log('Tea input matches the selected tea:', teaInput);
            setErrorMessage(''); // Clear error message
        } else {
            // Tea input does not match the selected tea, display error message
            setErrorMessage('Tea input does not match the selected tea');
        }
    };

    const TeaGameButton = () => {
        setShowTeaGame(true);
        console.log("WORKS")
    };

    return (
        <div className="AddTeaOrder componentBox">
            {!showTeaGame && (

                <>

                    {/* <form onSubmit={handleSubmit}> */}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Name:{defaultName}

                            </label>
                        </div>
                        <div>
                            <label>Tea:
                                {/* <input name="latinName" value={latinname} onChange={(e) => setLatinName(e.target.value)} /> */}
                                <input name="tea" value={teaInput} onChange={(e) => setTeaInput(e.target.value)}/>

                            </label>

                        </div>
                        <button type="submit">Enter Order</button>

                    </form>
                    {/* <button onClick={TeaGameButton}>Enter Order</button> */}
                </>

            )}


            {showTeaGame && <TeaGame />}
        </div>
    )
}






export default AddTeaOrder;