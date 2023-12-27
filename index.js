function startGame() {
    var player1Name = document.getElementById('player1').value;
    var player2Name = document.getElementById('player2').value;

    if (player1Name.trim() === '' || player2Name.trim() === '') {
        alert('Please enter names for both players.');
    } else {
        // Redirect to the second HTML page with player names as query parameters
        window.location.href = 'secondPage.html?player1=' + encodeURIComponent(player1Name) + '&player2=' + encodeURIComponent(player2Name);
    }
}