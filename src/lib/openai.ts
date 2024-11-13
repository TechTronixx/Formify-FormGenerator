interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function generateWithAI(messages: ChatMessage[]) {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    return await response.json();
  } catch (error) {
    console.error("AI Generation error:", error);
    throw error;
  }
}
