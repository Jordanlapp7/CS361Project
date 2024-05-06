document.getElementById('questionForm').addEventListener('submit', async function(e) {
    e.preventDefault()
    console.log("HERE")
    const date = document.getElementById('date').value
    let checkboxes = document.getElementsByName('sports-league');
    let sportsLeague = "";
      for (var i = 0; i < checkboxes.length; i++) {
          if (checkboxes[i].checked) {
              sportsLeague += checkboxes[i].value
                  + ", ";
          }
        }
    const articleLength = document.getElementById('article-length').value
    fetch('/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, sportsLeague, articleLength }),
    })
    .then(response => response.json())
    .catch(error => console.error('Fetch error:', error))
})