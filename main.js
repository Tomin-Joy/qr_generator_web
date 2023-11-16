var stat = false;
function extractDomain(url) {
  try {
    const domain = new URL(url).hostname;
    return domain;
  } catch (error) {
    console.error("Error extracting domain:", error);
    return url;
  }
}
function connection() {
  const apiUrl = "https://qr-sfio.onrender.com";
  const img = document.getElementById("QR");
  const downloadLink = document.createElement("a");
  downloadLink.href = img.src;
  downloadLink.download = "tominjoy.png";
  document.getElementById("dwnld").onclick = function () {
    downloadLink.click();
  };

  fetch(apiUrl, { method: "GET" })
    .then((response) => {
      if (response.ok) {
        console.log("API is reachable");
        stat = true;
      } else {
        console.error(`API is not reachable. Status: ${response.status}`);
        stat = false;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      stat = false;
    });
}

function generator() {
  document.getElementById("gnrt").innerText = "Generating...";
  let link = link_frm.txt.value ? link_frm.txt.value : "https://tominjoy.tech";
  console.log(link);
  const domain = extractDomain(link);
  const api = `https://qr-sfio.onrender.com/generate_qr/?image_url=${encodeURIComponent(
    link
  )}`;
  fetch(api)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.blob(); // This assumes the response is an image
    })
    .then((blob) => {
      const imageUrl = URL.createObjectURL(blob);
      console.log("here");
      document.getElementById("QR").src = imageUrl;
      const downloadLink = document.createElement("a");
      downloadLink.href = imageUrl;
      downloadLink.download = `${domain}.png`;
      document.getElementById("dwnld").onclick = function () {
        downloadLink.click();
      };
      document.getElementById("gnrt").innerText = "Generate";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
