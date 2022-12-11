import React from "react";
import Chat, { Bubble, useMessages } from "@chatui/core";
import "@chatui/core/dist/index.css";

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const initialMessages = [
  {
    type: "text",
    content: { text: "Hi, this is OpenAI chat assistant. Ask me anything." },
    user: {
      avatar: "https://openai.com/content/images/2022/05/openai-avatar.png",
    },
  },
];

export default function AIChat() {
  const openai = new OpenAIApi(configuration);
  const { messages, appendMsg, setTyping } = useMessages(initialMessages);

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
          max_tokens: 500,
          temperature: 0.9,
        })
        .then((response) =>
          appendMsg({
            type: "text",
            content: { text: response.data.choices[0].text.trim() },
            user: {
              avatar:
                "https://openai.com/content/images/2022/05/openai-avatar.png",
            },
          })
        );
    }
  }

  function renderMessageContent(msg) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }

  return (
    <Chat
      locale="en-US"
      navbar={{ title: "Ask AI for help" }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
    />
  );
}
