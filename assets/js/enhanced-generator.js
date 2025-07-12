// Enhanced parser to replace the parseStoryboardToGame function in your index.html

function parseStoryboardToGame(content) {
    console.log('Parsing enhanced storyboard format...');
    
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
            fullContent: dayContent
        };
    });
    
    // Extract visual style info
    const visualMatch = content.match(/### Color Palettes\s*([\s\S]*?)(?=###|$)/);
    const visualStyle = {
        colorPalettes: [],
        defaultMood: 'peaceful'
    };
    
    if (visualMatch) {
        const colorLines = visualMatch[1].split('\n').filter(line => line.includes('**'));
        colorLines.forEach(line => {
            const colorMatch = line.match(/\*\*([^*]+)\*\*:\s*(.+)/);
            if (colorMatch) {
                visualStyle.colorPalettes.push({
                    name: colorMatch[1].trim(),
                    description: colorMatch[2].trim()
                });
            }
        });
    }
    
    // Determine mood based on content
    const determineMood = (sceneContent) => {
        const content = sceneContent.toLowerCase();
        if (content.includes('mysterious') || content.includes('hidden') || content.includes('secret')) {
            return 'mysterious';
        } else if (content.includes('celebration') || content.includes('festival') || content.includes('joy')) {
            return 'celebratory';
        } else if (content.includes('crisis') || content.includes('conflict') || content.includes('challenge')) {
            return 'dramatic';
        }
        return 'peaceful';
    };
    
    // Add mood to each scene
    scenes.forEach(scene => {
        scene.mood = determineMood(scene.fullContent);
    });
    
    console.log('Parsed game data:', {
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
        visualStyle,
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
