import React from "react";
import Chat, { Bubble, useMessages } from "@chatui/core";
import "@chatui/core/dist/index.css";

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});

export default function App() {
  const openai = new OpenAIApi(configuration);
  const { messages, appendMsg, setTyping } = useMessages([]);

  function handleSend(type, val) {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
      });

      setTyping(true);

      openai
        .createCompletion({
          model: "text-davinci-003",
          prompt: val,
          max_tokens: 100,
          temperature: 0.9,
        })
        .then((response) =>
          appendMsg({
            type: "text",
            content: { text: response.data.choices[0].text.trim() },
          })
        );
      // setTimeout(() => {
      //   appendMsg({
      //     type: "text",
      //     content: { text: "Bala bala" },
      //   });
      // }, 1000);
    }
  }

  function renderMessageContent(msg) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }

  return (
    <Chat
      navbar={{ title: "Chat With AI" }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
    />
  );
}
