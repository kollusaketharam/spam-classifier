async function checkSpam() {
  const message = document.getElementById("message").value;
  if (!message) {
    alert("Please enter a message!");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message })   // ✅ fixed key
    });

    const data = await response.json();
    const resultDiv = document.getElementById("result");

    if (data.prediction === "spam") {   // ✅ lowercase to match backend
      resultDiv.innerHTML = "🚨 Spam Detected!";
      resultDiv.className = "result spam";
    } else {
      resultDiv.innerHTML = "✅ Safe (Ham)";
      resultDiv.className = "result ham";
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("result").innerHTML = "❌ Server Error!";
  }
}
