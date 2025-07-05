// Text Adventure Game Generator JavaScript

let gameContent = "";
let currentGameBlob = null;

// Initialize the generator when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeGenerator();
});

function initializeGenerator() {
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const previewBtn = document.getElementById('previewBtn');
    
    if (generateBtn) {
        generateBtn.addEventListener('click', generateAdventure);
    }
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadGame);
    }
    if (previewBtn) {
        previewBtn.addEventListener('click', previewGame);
    }
    
    console.log('Text Adventure Generator initialized');
}

function generateAdventure() {
    const btn = document.getElementById('generateBtn');
    btn.disabled = true;
    btn.textContent = '🔄 Generating...';
    
    document.getElementById('statusDiv').style.display = 'block';
    document.getElementById('resultDiv').style.display = 'none';
    
    updateProgress('Initializing game engine...', 0);
    
    setTimeout(() => {
        updateProgress('Parsing storyboard content...', 20);
    }, 300);
    
    setTimeout(() => {
        updateProgress('Creating character profiles...', 40);
    }, 800);
    
    setTimeout(() => {
        updateProgress('Building interactive scenes...', 60);
    }, 1300);
    
    setTimeout(() => {
        updateProgress('Generating pixel art elements...', 80);
    }, 1800);
    
    setTimeout(() => {
        updateProgress('Finalizing game package...', 100);
        completeGeneration();
    }, 2300);
}

function completeGeneration() {
    const title = document.getElementById('gameTitle').value || "The Secret Vineyard Sanctuary";
    const length = document.getElementById('adventureLength').value;
    const style = document.getElementById('storyStyle').value;
    const customStoryboard = document.getElementById('storyboardInput').value.trim();
    
    // Create the game content
    gameContent = createGameHTML(title, length, style, customStoryboard);
    
    // Create blob for preview
    currentGameBlob = new Blob([gameContent], {type: 'text/html'});
    
    // Update stats
    updateStats(length, style);
    
    // Show results
    document.getElementById('statusDiv').style.display = 'none';
    document.getElementById('resultDiv').style.display = 'block';
    document.getElementById('resultDiv').scrollIntoView({behavior: 'smooth'});
    
    // Reset button
    const btn = document.getElementById('generateBtn');
    btn.disabled = false;
    btn.textContent = '🎮 Generate Adventure';
    
    console.log('Game generation completed successfully');
}

function updateStats(length, style) {
    const sceneCount = length === 'short' ? 3 : length === 'medium' ? 5 : 8;
    const wordMultiplier = style === 'rich' ? 200 : 150;
    const wordCount = sceneCount * wordMultiplier;
    const playTime = Math.ceil(sceneCount * 3.5);
    
    document.getElementById('sceneCount').textContent = sceneCount;
    document.getElementById('wordCount').textContent = wordCount.toLocaleString();
    document.getElementById('playTime').textContent = playTime;
}

function createGameHTML(title, length, style, customStoryboard) {
    const sceneCount = length === 'short' ? 3 : length === 'medium' ? 5 : 8;
    
    // Default vineyard scenes
    let scenes = [
        "You discover the mysterious vineyard gate hidden behind ivy and wild roses. Your friends gather around as you examine the weathered nameplate.",
        "You enter the forgotten vineyard and see rows of ancient, gnarled vines. The air is heavy with the scent of earth and untold stories.",
        "You find an old tool shed filled with wine-making equipment from another era. Everything is covered in dust but remarkably well-preserved.",
        "You discover a journal with notes about the legendary Elixir of Balance. The pages speak of harmony between work, family, and dreams.",
        "You begin to understand the vineyard's history and the family who once lived here. Their story mirrors your own search for balance.",
        "You work together to restore part of the vineyard, finding unexpected satisfaction in the collaborative labor.",
        "A breakthrough moment reveals the true secret of the Elixir of Balance. It's not about the wine - it's about the journey shared with friends.",
        "Your family calls just as you make your greatest discovery, grounding you in what truly matters most."
    ];
    
    // Use custom scenes if provided (basic parsing)
    if (customStoryboard) {
        const customScenes = parseCustomStoryboard(customStoryboard);
        if (customScenes.length > 0) {
            scenes = customScenes;
        }
    }
    
    // Trim to selected length
    scenes = scenes.slice(0, sceneCount);
    
    // Enhance with rich descriptions if selected
    if (style === 'rich') {
        scenes = scenes.map(scene => {
            const enhancements = [
                " The late afternoon light filters through the leaves, casting dancing shadows.",
                " You feel the weight of history in every stone and vine.",
                " The air is thick with the scent of earth and possibility.",
                " A gentle breeze carries the whisper of forgotten stories.",
                " The moment feels suspended between past and future."
            ];
            const enhancement = enhancements[Math.floor(Math.random() * enhancements.length)];
            return scene + enhancement;
        });
    }
    
    // Build the complete HTML game
    const html = buildGameHTML(title, scenes);
    return html;
}

function parseCustomStoryboard(storyboard) {
    // Basic markdown parsing for day entries
    const dayPattern = /\*\*Day \d+:.*?\*\*\s*\n(.*?)(?=\*\*Day \d+:|$)/gs;
    const scenes = [];
    let match;
    
    while ((match = dayPattern.exec(storyboard)) !== null) {
        const sceneText = match[1].trim()
            .replace(/\*\*/g, '') // Remove bold formatting
            .replace(/\* /g, '') // Remove bullet points
            .split('\n')[0] // Take first line as main description
            .trim();
        
        if (sceneText && sceneText.length > 20) {
            scenes.push(sceneText);
        }
    }
    
    return scenes;
}

function buildGameHTML(title, scenes) {
    const escapedTitle = title.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    const escapedScenes = scenes.map(scene => 
        scene.replace(/"/g, '\\"').replace(/'/g, "\\'").replace(/\n/g, ' ')
    );
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapedTitle}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Courier New', monospace;
            background: #000;
            color: #00ff00;
            min-height: 100vh;
            padding: 20px;
            line-height: 1.6;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            border: 2px solid #00ff00;
            border-radius: 10px;
            padding: 20px;
            background: rgba(0, 20, 0, 0.9);
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
        }
        
        .title {
            color: #ffff00;
            text-align: center;
            font-size: 24px;
            margin-bottom: 20px;
            text-transform: uppercase;
            border-bottom: 2px solid #ffff00;
            padding-bottom: 10px;
            text-shadow: 0 0 10px #ffff00;
        }
        
        .scene {
            margin-bottom: 25px;
            padding: 20px;
            border: 1px solid #004400;
            border-radius: 8px;
            background: rgba(0, 40, 0, 0.5);
            transition: all 0.3s ease;
        }
        
        .scene:hover {
            border-color: #00ff00;
            background: rgba(0, 60, 0, 0.7);
        }
        
        .scene h3 {
            color: #ffff00;
            margin-bottom: 15px;
            font-size: 18px;
        }
        
        .choice {
            background: transparent;
            color: #00ff00;
            border: 2px solid #00ff00;
            padding: 12px 20px;
            margin: 8px;
            border-radius: 5px;
            cursor: pointer;
            font-family: inherit;
            font-size: 14px;
            transition: all 0.3s ease;
            display: inline-block;
        }
        
        .choice:hover {
            background: #00ff00;
            color: #000;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 255, 0, 0.4);
        }
        
        .character-info {
            background: rgba(100, 0, 100, 0.3);
            border: 1px solid #ff00ff;
            padding: 15px;
            margin: 15px 0;
            border-radius: 5px;
        }
        
        .complete {
            text-align: center;
            font-size: 20px;
            color: #ffff00;
            margin: 30px 0;
            padding: 30px;
            border: 3px solid #ffff00;
            border-radius: 10px;
            background: rgba(100, 100, 0, 0.1);
            animation: glow 2s ease-in-out infinite alternate;
        }
        
        .progress {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            padding: 10px 15px;
            border: 1px solid #00ff00;
            border-radius: 5px;
            font-size: 12px;
            z-index: 1000;
        }
        
        @keyframes glow {
            from { text-shadow: 0 0 20px #ffff00; }
            to { text-shadow: 0 0 30px #ffff00, 0 0 40px #ffff00; }
        }
        
        @media (max-width: 600px) {
            .choice {
                display: block;
                width: 100%;
                margin: 5px 0;
            }
            
            .container {
                padding: 15px;
            }
            
            .title {
                font-size: 18px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="title">${escapedTitle}</div>
        <div id="content">
            <div class="scene">
                <h3>🎭 Choose Your Character</h3>
                <p>Welcome to your adventure! Each character brings a unique perspective to the story. Choose wisely, as your selection will influence how you experience the journey ahead.</p>
            </div>
            <div style="text-align: center;">
                <button class="choice" onclick="startGame('Sam')">🗂️ Sam the Planner</button>
                <button class="choice" onclick="startGame('Riley')">🎨 Riley the Artist</button>
                <button class="choice" onclick="startGame('Morgan')">🍷 Morgan the Realist</button>
                <button class="choice" onclick="startGame('Casey')">🌱 Casey the Dreamer</button>
            </div>
        </div>
        <div class="progress" id="progress">Choose Your Character</div>
    </div>
    
    <script>
        const scenes = ${JSON.stringify(escapedScenes)};
        let currentScene = 0;
        let selectedCharacter = "";
        
        const characterTraits = {
            "Sam": "You approach every challenge with careful planning and organization. Your friends rely on your ability to think ahead and keep everyone on track.",
            "Riley": "You see beauty and artistic potential in every situation. Your creative vision helps others discover magic in the mundane.",
            "Morgan": "You bring practical wisdom and real-world knowledge to every adventure. Your grounded perspective keeps dreams achievable.",
            "Casey": "You connect intuitively with nature and believe deeply in life's possibilities. Your optimism inspires others to dream bigger."
        };

        function startGame(character) {
            selectedCharacter = character;
            showScene(0);
        }

        function showScene(sceneIndex) {
            if (sceneIndex >= scenes.length) {
                document.getElementById("progress").innerHTML = "🎉 Complete!";
                return;
            }
            
            currentScene = sceneIndex;
            const sceneHtml = 
                '<div class="scene">' +
                '<h3>Day ' + (sceneIndex + 1) + ' - ' + selectedCharacter + ' Perspective</h3>' +
                (sceneIndex === 0 ? '<div class="character-info"><strong>' + selectedCharacter + ':</strong> ' + characterTraits[selectedCharacter] + '</div>' : '') +
                '<p>' + scenes[sceneIndex] + '</p>' +
                '<button class="choice" onclick="nextScene()">Continue Adventure →</button>' +
                '</div>';
            
            document.getElementById("content").innerHTML = sceneHtml;
            document.getElementById("progress").innerHTML = "Day " + (sceneIndex + 1) + " of " + scenes.length;
        }

        function nextScene() {
            showScene(currentScene + 1);
        }
    </script>
</body>
</html>`;
}

function updateProgress(text, percent) {
    document.getElementById('statusText').textContent = text;
    document.getElementById('progressFill').style.width = percent + '%';
}

function downloadGame() {
    if (!gameContent) {
        alert('Please generate an adventure first!');
        return;
    }
    
    const title = document.getElementById('gameTitle').value || "vineyard_adventure";
    const filename = title.toLowerCase().replace(/[^a-z0-9]/g, '_') + '.html';
    
    const blob = new Blob([gameContent], {type: 'text/html'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('Game downloaded:', filename);
}

function previewGame() {
    if (!currentGameBlob) {
        alert('Please generate an adventure first!');
        return;
    }
    
    const url = URL.createObjectURL(currentGameBlob);
    window.open(url, '_blank');
    
    // Clean up the URL after a delay
    setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 1000);
    
    console.log('Game preview opened');
}getElementById("content").innerHTML = 
                    '<div class="complete">' +
                    '<h2>🎉 Adventure Complete!</h2>' +
                    '<p>You have discovered the true meaning of your journey. The adventure may be over, but the memories and friendships will last forever.</p>' +
                    '<p><strong>As ' + selectedCharacter + ':</strong> ' + characterTraits[selectedCharacter] + '</p>' +
                    '<p>Thank you for playing! Share this adventure with friends and create new stories together.</p>' +
                    '</div>';
                document.
