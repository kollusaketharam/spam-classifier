async function checkSpam() {
  const message = document.getElementById("message").value;
  if (!message) {
    alert("Please enter a message!");
    return;
  }

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "⏳ Checking...";
  resultDiv.className = "result";

  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: message })
    });

    const data = await response.json();

    if (data.prediction === "spam") {
      resultDiv.innerHTML = "🚨 Spam Detected!";
      resultDiv.className = "result spam";
    } else {
      resultDiv.innerHTML = "✅ Safe (Ham)";
      resultDiv.className = "result ham";
    }
  } catch (error) {
    console.error("Error:", error);
    resultDiv.innerHTML = "❌ Server Error!";
    resultDiv.className = "result";
  }
}

function clearMessage() {
  document.getElementById("message").value = "";
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";
  resultDiv.className = "result";
}
