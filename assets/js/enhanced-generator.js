// Enhanced Storyboard Parser and Game Generator
// assets/js/enhanced-generator.js

function parseStoryboardToGame(content) {
    console.log('🔍 Parsing enhanced storyboard format...');
    
    // Extract title
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : "Adventure Game";
    
    // Extract core theme
    const themeMatch = content.match(/\*\*Core Theme\*\*:\s*(.+?)(?:\n|$)/);
    const coreTheme = themeMatch ? themeMatch[1].trim() : "";
    
    // Extract setting
    const settingMatch = content.match(/\*\*Setting\*\*:\s*(.+?)(?:\n|$)/);
    const setting = settingMatch ? settingMatch[1].trim() : "";
    
    // Extract characters with enhanced details
    const characterMatches = content.match(/###\s+(.+?)(?:\n[\s\S]*?)(?=###|##|---)/g) || [];
    const characters = characterMatches.map(match => {
        const nameMatch = match.match(/###\s+(.+?)$/m);
        const personalityMatch = match.match(/\*\*Personality\*\*:\s*(.+?)(?:\n|$)/);
        const abilityMatch = match.match(/\*\*Special Ability\*\*:\s*(.+?)(?:\n|$)/);
        const arcMatch = match.match(/\*\*Character Arc\*\*:\s*(.+?)(?:\n|$)/);
        const backgroundMatch = match.match(/\*\*Background\*\*:\s*(.+?)(?:\n|$)/);
        
        return {
            name: nameMatch ? nameMatch[1].trim() : "Character",
            personality: personalityMatch ? personalityMatch[1].trim() : "",
            ability: abilityMatch ? abilityMatch[1].trim() : "",
            arc: arcMatch ? arcMatch[1].trim() : "",
            background: backgroundMatch ? backgroundMatch[1].trim() : ""
        };
    });
    
    // Extract daily episodes with full detail
    const dayMatches = content.match(/\*\*Day \d+:[^*]+\*\*[\s\S]*?(?=\*\*Day \d+:|---|\n##|\n$)/g) || [];
    const scenes = dayMatches.map((dayContent, index) => {
        // Extract day title
        const titleMatch = dayContent.match(/\*\*Day (\d+):\s*"([^"]+)"\s*\*\*/);
        const dayNumber = titleMatch ? parseInt(titleMatch[1]) : index + 1;
        const sceneTitle = titleMatch ? titleMatch[2] : `Day ${dayNumber}`;
        
        // Extract main description (first bullet or line after title)
        const lines = dayContent.split('\n').filter(line => line.trim());
        const descriptionLine = lines.find(line => 
            line.includes('*') && 
            !line.includes('**Family Moment**') && 
            !line.includes('**Discovery**') &&
            !line.includes('**Choices**') &&
            !line.includes('**Day')
        );
        
        let description = descriptionLine ? 
            descriptionLine.replace(/^\*\s*/, '').trim() : 
            "Continue your adventure in the vineyard.";
            
        // Extract family moment
        const familyMatch = dayContent.match(/\*\*Family Moment\*\*:\s*(.+?)(?:\n|$)/);
        const familyMoment = familyMatch ? familyMatch[1].trim() : "";
        
        // Extract discovery
        const discoveryMatch = dayContent.match(/\*\*Discovery\*\*:\s*(.+?)(?:\n|$)/);
        const discovery = discoveryMatch ? discoveryMatch[1].trim() : "";
        
        // Extract choices
        const choicesMatch = dayContent.match(/\*\*Choices\*\*:\s*(.+?)(?:\n|$)/);
        let choices = [];
        if (choicesMatch) {
            const choicesText = choicesMatch[1];
            const choicePattern = /\[([^\]]+)\]/g;
            let match;
            while ((match = choicePattern.exec(choicesText)) !== null) {
                choices.push(match[1].trim());
            }
        }
        
        // Default choices if none specified
        if (choices.length === 0) {
            choices = ["Continue the adventure", "Explore further", "Reflect on the moment"];
        }
        
        return {
            dayNumber,
            title: sceneTitle,
            description,
            familyMoment,
            discovery,
            choices,
            mood: determineMood(dayContent)
        };
    });
    
    function determineMood(sceneContent) {
        const content = sceneContent.toLowerCase();
        if (content.includes('mysterious') || content.includes('hidden') || content.includes('secret')) {
            return 'mysterious';
        } else if (content.includes('celebration') || content.includes('festival') || content.includes('joy')) {
            return 'celebratory';
        } else if (content.includes('crisis') || content.includes('conflict') || content.includes('challenge')) {
            return 'dramatic';
        }
        return 'peaceful';
    }
    
    console.log('✅ Parsed game data:', {
        title,
        characterCount: characters.length,
        sceneCount: scenes.length,
        hasChoices: scenes.some(s => s.choices.length > 0)
    });
    
    return {
        title,
        coreTheme,
        setting,
        characters: characters.length > 0 ? characters : getDefaultCharacters(),
        scenes: scenes.length > 0 ? scenes : getDefaultScenes(),
        visualStyle: { colorPalettes: [], defaultMood: 'peaceful' },
        metadata: {
            hasRichContent: true,
            totalChoices: scenes.reduce((sum, s) => sum + s.choices.length, 0),
            hasFamilyMoments: scenes.some(s => s.familyMoment),
            hasDiscoveries: scenes.some(s => s.discovery)
        }
    };
}

function getDefaultCharacters() {
    return [
        {
            name: "Sam the Planner",
            personality: "Organized, prepared, detail-oriented",
            ability: "Always finds useful items and resources",
            arc: "Learning to embrace uncertainty",
            background: "Manages family schedules like a military operation"
        },
        {
            name: "Riley the Artist", 
            personality: "Creative, intuitive, sees beauty everywhere",
            ability: "Notices hidden details and artistic elements",
            arc: "Learning to ground dreams in reality",
            background: "Turns everyday moments into art"
        },
        {
            name: "Morgan the Realist",
            personality: "Practical, wine-knowledgeable, skeptical but hopeful",
            ability: "Understands technical aspects and problem-solving",
            arc: "Opening heart to possibility and magic",
            background: "The voice of reason who learns to trust in wonder"
        },
        {
            name: "Casey the Dreamer",
            personality: "Optimistic, plant-intuitive, believes in magic",
            ability: "Connects with nature and senses vineyard's spirit",
            arc: "Learning to channel dreams into concrete action", 
            background: "The family cheerleader who sees potential everywhere"
        }
    ];
}

function getDefaultScenes() {
    return [
        {
            dayNumber: 1,
            title: "The Hidden Gate",
            description: "Discover the mysterious vineyard gate during estate walk",
            familyMoment: "Spouse texts about kids' schedules",
            discovery: "Ancient iron gate with 'Harmony Vineyard' nameplate",
            choices: ["Examine gate closely", "Check estate map", "Ask friends' opinions"],
            mood: "mysterious"
        },
        {
            dayNumber: 2,
            title: "First Steps",
            description: "Enter the vineyard properly, assess the scope of abandonment",
            familyMoment: "Child calls for homework help via video",
            discovery: "The vineyard has three distinct growing areas",
            choices: ["Explore the journal carefully", "Investigate the vine rows", "Look for main building"],
            mood: "peaceful"
        },
        {
            dayNumber: 3,
            title: "The Tool Shed",
            description: "Explore the old equipment shed, meet quirky local hardware store owner",
            familyMoment: "Forgotten soccer practice creates scheduling chaos",
            discovery: "Original wine-making tools and equipment (some still usable)",
            choices: ["Focus on learning from neighbor", "Examine the old tools", "Ask about purchasing supplies"],
            mood: "peaceful"
        }
    ];
}

function createGameHTML(gameData) {
    const { title, coreTheme, setting, characters, scenes } = gameData;
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Courier New', monospace;
            background: #000;
            color: #00ff00;
            min-height: 100vh;
            padding: 20px;
            line-height: 1.6;
            background-image: 
                radial-gradient(circle at 20% 80%, rgba(0, 100, 0, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(0, 100, 0, 0.1) 0%, transparent 50%);
        }
        
        .game-container {
            max-width: 900px;
            margin: 0 auto;
            border: 2px solid #00ff00;
            border-radius: 15px;
            padding: 25px;
            background: rgba(0, 20, 0, 0.95);
            box-shadow: 
                0 0 30px rgba(0, 255, 0, 0.3),
                inset 0 0 20px rgba(0, 50, 0, 0.5);
        }
        
        .game-header {
            text-align: center;
            border-bottom: 2px solid #ffff00;
            padding-bottom: 20px;
            margin-bottom: 25px;
        }
        
        .game-title {
            color: #ffff00;
            font-size: 28px;
            text-transform: uppercase;
            text-shadow: 0 0 15px #ffff00;
            margin-bottom: 10px;
            animation: titleGlow 3s ease-in-out infinite alternate;
        }
        
        .game-subtitle {
            color: #00ff00;
            font-size: 14px;
            opacity: 0.8;
            font-style: italic;
        }
        
        @keyframes titleGlow {
            from { text-shadow: 0 0 15px #ffff00; }
            to { text-shadow: 0 0 25px #ffff00, 0 0 35px #ffff00; }
        }
        
        .scene {
            margin-bottom: 30px;
            padding: 25px;
            border: 1px solid #004400;
            border-radius: 12px;
            background: rgba(0, 40, 0, 0.6);
            transition: all 0.3s ease;
            position: relative;
        }
        
        .scene:hover {
            border-color: #00ff00;
            background: rgba(0, 60, 0, 0.8);
        }
        
        .scene-title {
            color: #ffff00;
            font-size: 20px;
            margin-bottom: 15px;
            text-transform: uppercase;
        }
        
        .scene-mood {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(255, 255, 0, 0.2);
            color: #ffff00;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 10px;
            text-transform: uppercase;
        }
        
        .scene-description {
            color: #00ff00;
            margin-bottom: 20px;
            font-size: 16px;
            line-height: 1.7;
        }
        
        .character-perspective {
            background: rgba(100, 0, 100, 0.4);
            border: 1px solid #ff00ff;
            padding: 15px;
            margin: 15px 0;
            border-radius: 8px;
            border-left: 4px solid #ff00ff;
        }
        
        .character-name {
            color: #ff00ff;
            font-weight: bold;
            margin-bottom: 8px;
        }
        
        .character-trait {
            color: #ffaaff;
            font-size: 13px;
            font-style: italic;
        }
        
        .family-moment {
            background: rgba(0, 100, 100, 0.3);
            border: 1px solid #00ffff;
            padding: 12px;
            margin: 15px 0;
            border-radius: 6px;
            border-left: 3px solid #00ffff;
        }
        
        .family-moment-title {
            color: #00ffff;
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 5px;
            text-transform: uppercase;
        }
        
        .family-moment-text {
            color: #aaffff;
            font-size: 14px;
        }
        
        .discovery {
            background: rgba(255, 255, 0, 0.2);
            border: 1px solid #ffff00;
            padding: 12px;
            margin: 15px 0;
            border-radius: 6px;
            border-left: 3px solid #ffff00;
        }
        
        .discovery-title {
            color: #ffff00;
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 5px;
            text-transform: uppercase;
        }
        
        .discovery-text {
            color: #ffffaa;
            font-size: 14px;
        }
        
        .choices-container {
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px solid #004400;
        }
        
        .choices-title {
            color: #00ff00;
            font-size: 14px;
            margin-bottom: 10px;
            text-transform: uppercase;
        }
        
        .choices {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px;
        }
        
        .choice {
            background: transparent;
            color: #00ff00;
            border: 2px solid #00ff00;
            padding: 12px 16px;
            border-radius: 8px;
            cursor: pointer;
            font-family: inherit;
            font-size: 13px;
            transition: all 0.3s ease;
            text-align: center;
        }
        
        .choice:hover {
            background: #00ff00;
            color: #000;
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0, 255, 0, 0.4);
        }
        
        .progress-container {
            position: fixed;
            bottom: 25px;
            right: 25px;
            background: rgba(0, 0, 0, 0.9);
            padding: 15px 20px;
            border: 2px solid #00ff00;
            border-radius: 10px;
            font-size: 12px;
            z-index: 1000;
            min-width: 200px;
        }
        
        .progress-title {
            color: #ffff00;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .progress-text {
            color: #00ff00;
            margin-bottom: 8px;
        }
        
        .progress-bar {
            width: 100%;
            height: 6px;
            background: #004400;
            border-radius: 3px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #00ff00, #ffff00);
            transition: width 0.5s ease;
        }
        
        .completion-screen {
            text-align: center;
            padding: 40px 20px;
            border: 3px solid #ffff00;
            border-radius: 15px;
            background: rgba(100, 100, 0, 0.1);
            animation: completionGlow 2s ease-in-out infinite alternate;
        }
        
        @keyframes completionGlow {
            from { 
                box-shadow: 0 0 20px rgba(255, 255, 0, 0.3);
                border-color: #ffff00;
            }
            to { 
                box-shadow: 0 0 40px rgba(255, 255, 0, 0.6);
                border-color: #00ff00;
            }
        }
        
        .completion-title {
            font-size: 32px;
            color: #ffff00;
            margin-bottom: 20px;
            text-transform: uppercase;
        }
        
        .completion-message {
            font-size: 18px;
            color: #00ff00;
            margin-bottom: 25px;
            line-height: 1.6;
        }
        
        .character-summary {
            background: rgba(100, 0, 100, 0.3);
            padding: 20px;
            margin: 20px 0;
            border-radius: 10px;
            border: 2px solid #ff00ff;
        }
        
        .restart-btn {
            background: linear-gradient(45deg, #ff00ff, #00ffff);
            color: #000;
            border: none;
            padding: 15px 30px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 20px;
            transition: all 0.3s ease;
        }
        
        .restart-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(255, 0, 255, 0.4);
        }
        
        .character-selection {
            text-align: center;
            padding: 30px;
        }
        
        .character-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 25px;
        }
        
        .character-card {
            background: rgba(0, 40, 0, 0.6);
            border: 2px solid #004400;
            border-radius: 12px;
            padding: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
        }
        
        .character-card:hover {
            border-color: #00ff00;
            background: rgba(0, 60, 0, 0.8);
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 255, 0, 0.3);
        }
        
        .character-card-name {
            color: #ffff00;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .character-card-personality {
            color: #00ff00;
            font-size: 13px;
            margin-bottom: 8px;
        }
        
        .character-card-ability {
            color: #aaffaa;
            font-size: 12px;
            font-style: italic;
        }
        
        @media (max-width: 768px) {
            .game-container { padding: 15px; }
            .character-grid { grid-template-columns: 1fr; }
            .choices { grid-template-columns: 1fr; }
            .progress-container { position: relative; bottom: auto; right: auto; margin-top: 20px; }
        }
    </style>
</head>
<body>
    <div class="game-container">
        <div class="game-header">
            <div class="game-title">${title}</div>
            <div class="game-subtitle">${coreTheme || 'An Interactive Adventure'}</div>
            ${setting ? `<div class="game-subtitle" style="margin-top: 5px;">${setting}</div>` : ''}
        </div>
        
        <div id="content">
            <div class="character-selection">
                <div class="scene-title">🎭 Choose Your Character</div>
                <div class="scene-description">
                    Welcome to your adventure! Each character brings a unique perspective and abilities to the story. 
                    Your choice will influence how you experience and interact with the unfolding narrative.
                </div>
                
                <div class="character-grid">
                    ${characters.map(char => `
                        <div class="character-card" onclick="startGame('${char.name}')">
                            <div class="character-card-name">${char.name}</div>
                            <div class="character-card-personality">${char.personality || 'Ready for adventure'}</div>
                            <div class="character-card-ability">★ ${char.ability || 'Special perspective'}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <div class="progress-container" id="progress">
            <div class="progress-title">Adventure Progress</div>
            <div class="progress-text" id="progressText">Choose Your Character</div>
            <div class="progress-bar">
                <div class="progress-fill" id="progressFill" style="width: 0%"></div>
            </div>
        </div>
    </div>
    
    <script>
        const gameData = ${JSON.stringify(gameData)};
        let currentScene = 0;
        let selectedCharacter = null;
        let gameState = {
            choicesMade: [],
            startTime: new Date(),
            character: null
        };
        
        function startGame(characterName) {
            selectedCharacter = gameData.characters.find(c => c.name === characterName);
            gameState.character = selectedCharacter;
            updateProgress(0);
            showScene(0);
        }

        function showScene(sceneIndex) {
            if (sceneIndex >= gameData.scenes.length) {
                showCompletion();
                return;
            }
            
            currentScene = sceneIndex;
            const scene = gameData.scenes[sceneIndex];
            const progress = ((sceneIndex + 1) / gameData.scenes.length) * 100;
            
            let sceneHTML = '<div class="scene">';
            sceneHTML += '<div class="scene-mood">' + (scene.mood || 'peaceful') + '</div>';
            sceneHTML += '<div class="scene-title">Day ' + scene.dayNumber + ': ' + scene.title + '</div>';
            sceneHTML += '<div class="scene-description">' + scene.description + '</div>';
            
            if (selectedCharacter) {
                sceneHTML += '<div class="character-perspective">';
                sceneHTML += '<div class="character-name">👤 ' + selectedCharacter.name + ' Perspective</div>';
                sceneHTML += '<div class="character-trait">' + (selectedCharacter.personality || '') + '</div>';
                sceneHTML += '</div>';
            }
            
            if (scene.familyMoment) {
                sceneHTML += '<div class="family-moment">';
                sceneHTML += '<div class="family-moment-title">📱 Family Moment</div>';
                sceneHTML += '<div class="family-moment-text">' + scene.familyMoment + '</div>';
                sceneHTML += '</div>';
            }
            
            if (scene.discovery) {
                sceneHTML += '<div class="discovery">';
                sceneHTML += '<div class="discovery-title">🔍 Discovery</div>';
                sceneHTML += '<div class="discovery-text">' + scene.discovery + '</div>';
                sceneHTML += '</div>';
            }
            
            if (scene.choices && scene.choices.length > 0) {
                sceneHTML += '<div class="choices-container">';
                sceneHTML += '<div class="choices-title">What do you choose to do?</div>';
                sceneHTML += '<div class="choices">';
                scene.choices.forEach((choice, index) => {
                    sceneHTML += '<button class="choice" onclick="makeChoice(' + index + ', \\'' + choice.replace(/'/g, "\\'") + '\\')">' + choice + '</button>';
                });
                sceneHTML += '</div>';
                sceneHTML += '</div>';
            } else {
                sceneHTML += '<div class="choices-container">';
                sceneHTML += '<div class="choices">';
                sceneHTML += '<button class="choice" onclick="nextScene()">Continue Adventure →</button>';
                sceneHTML += '</div>';
                sceneHTML += '</div>';
            }
            
            sceneHTML += '</div>';
            
            document.getElementById("content").innerHTML = sceneHTML;
            updateProgress(progress, 'Day ' + scene.dayNumber + ' of ' + gameData.scenes.length);
        }

        function makeChoice(choiceIndex, choiceText) {
            gameState.choicesMade.push({
                scene: currentScene,
                choice: choiceText,
                timestamp: new Date()
            });
            
            setTimeout(() => {
                nextScene();
            }, 300);
        }

        function nextScene() {
            showScene(currentScene + 1);
        }
        
        function updateProgress(percent, text) {
            if (text) {
                document.getElementById('progressText').textContent = text;
            }
            document.getElementById('progressFill').style.width = percent + '%';
        }
        
        function showCompletion() {
            const totalTime = Math.round((new Date() - gameState.startTime) / 1000 / 60);
            
            let completionHTML = '<div class="completion-screen">';
            completionHTML += '<div class="completion-title">🎉 Adventure Complete!</div>';
            completionHTML += '<div class="completion-message">';
            completionHTML += 'Congratulations! You have completed your journey through ' + gameData.title + '. ';
            completionHTML += 'Your choices and perspective as ' + selectedCharacter.name + ' have shaped this unique experience.';
            completionHTML += '</div>';
            
            if (selectedCharacter) {
                completionHTML += '<div class="character-summary">';
                completionHTML += '<div class="character-name">Your Character: ' + selectedCharacter.name + '</div>';
                completionHTML += '<div style="margin: 10px 0; color: #ffaaff;">' + (selectedCharacter.arc || 'You have grown through this adventure.') + '</div>';
                completionHTML += '<div style="color: #aaffaa; font-size: 14px;">Choices made: ' + gameState.choicesMade.length + '</div>';
                completionHTML += '<div style="color: #aaffaa; font-size: 14px;">Play time: ' + totalTime + ' minutes</div>';
                completionHTML += '</div>';
            }
            
            completionHTML += '<div class="completion-message">';
            completionHTML += 'Thank you for playing! The memories and friendships forged during this adventure will last a lifetime.';
            completionHTML += '</div>';
            
            completionHTML += '<button class="restart-btn" onclick="restartGame()">🔄 Play Again</button>';
            completionHTML += '</div>';
            
            document.getElementById("content").innerHTML = completionHTML;
            updateProgress(100, '✅ Adventure Complete!');
        }
        
        function restartGame() {
            currentScene = 0;
            selectedCharacter = null;
            gameState = {
                choicesMade: [],
                startTime: new Date(),
                character: null
            };
            location.reload();
        }
        
        console.log('🎮 Game initialized:', gameData.title);
    </script>
</body>
</html>`;
}
