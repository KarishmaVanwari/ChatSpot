import React from "react";
import Fab from "@material-ui/core/Fab";
import Send from "@material-ui/icons/Send";
import Input from "@material-ui/core/Input";

const InputMessage = ({ setMessage, message, sendMessage }) => {
  const onSend = (event) => {
    // event.preventDefault();
    console.log("event", event);
    if (event.key === "Enter") {
      sendMessage(event);
      event.target.value = "";
    }
  };

  const onClickSend = (event) => {
    console.log(
      "naya ",
      event.target.parentElement.parentElement.parentElement.children[0]
        .parentElement.children[0].children[0]
    );
    sendMessage(event);
    document.querySelector(".MuiInputBase-input").value = "";
    document.querySelector(".MuiInputBase-input").focus()
    // event.target.value= "";
  };
  return (
    <div className="send">
      <form>
        <Input
          onChange={({ target: { value } }) => {
            console.log("val", value);
            setMessage(value);
          }}
          onKeyPress={onSend}
          placeholder="Type a message"
          color="secondary"
          style={{ width: "90%", color: "white", margin: "0 10px" }}
          inputProps={{ "aria-label": "description" }}
        />
        <Fab color="secondary" aria-label="send" size="small">
          <Send style={{ fontSize: 18 }} onClick={onClickSend} />
        </Fab>
      </form>
    </div>
  );
};

export default InputMessage;
