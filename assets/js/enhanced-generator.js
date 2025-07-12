// Enhanced Storyboard Parser and Game Generator
// assets/js/enhanced-generator.js

class EnhancedStoryboardGenerator {
    constructor() {
        // Character-specific narrative perspectives
        this.characterVoices = {
            "Sam the Planner": {
                observationStyle: "methodical and detail-oriented",
                concerns: ["organization", "safety", "logistics", "preparation"],
                language: ["systematic", "careful", "thorough", "practical"],
                perspective: "As someone who values organization and preparation, you find yourself automatically cataloging what you see - noting conditions, estimating requirements, and thinking about what tools might be needed. Your practical mind is already forming a mental checklist."
            },
            "Riley the Artist": {
                observationStyle: "aesthetic and emotionally intuitive", 
                concerns: ["beauty", "inspiration", "creative potential", "artistic details"],
                language: ["enchanting", "atmospheric", "textured", "expressive"],
                perspective: "Your artistic eye is immediately drawn to the interplay of light and shadow, the way elements create natural compositions, and the story told by layers of time and growth. This place calls to your creative spirit - you can almost see the art waiting to be born from these scenes."
            },
            "Morgan the Realist": {
                observationStyle: "practical and analytical",
                concerns: ["feasibility", "facts", "technical aspects", "realistic outcomes"],
                language: ["pragmatic", "concrete", "evidence-based", "straightforward"],
                perspective: "Your practical knowledge kicks in as you assess the situation - the technical aspects, structural integrity, and realistic potential. You recognize quality in the fundamental design of this place, despite its current state."
            },
            "Casey the Dreamer": {
                observationStyle: "intuitive and possibility-focused",
                concerns: ["potential", "magic", "connection", "harmony"],
                language: ["mystical", "hopeful", "flowing", "transformative"],
                perspective: "Something magical hums beneath the surface here. You sense the sleeping spirit of this place, feel the connection between past and present. This isn't just abandoned property - it's a place waiting for the right people to awaken its potential again."
            }
        };

        // Enhanced scene templates for richer storytelling
        this.sceneTemplates = {
            "The Hidden Gate": {
                setting: "A weathered iron gate stands partially hidden behind overgrown ivy and wild roses",
                atmosphere: "mysterious and inviting, with dappled sunlight filtering through ancient oak branches",
                details: {
                    visual: "rust-streaked metal bars with intricate scrollwork, bronze nameplate barely visible beneath vegetation",
                    sounds: "gentle creaking in the breeze, distant bird calls, rustling leaves",
                    scents: "wild roses, earth after rain, hint of something grape-sweet",
                    textures: "cool metal, rough bark, soft moss"
                },
                backstory: "This forgotten entrance seems to have stood untouched for decades",
                tension: "What secrets lie beyond this mysterious barrier?"
            },
            "First Steps": {
                setting: "Beyond the gate, rows of abandoned grapevines stretch across rolling hills",
                atmosphere: "peaceful yet melancholic, filled with untapped potential",
                details: {
                    visual: "overgrown vine rows, crumbling stone walls, distant shed with sagging roof",
                    sounds: "wind through vines, your footsteps on gravel, creaking wood",
                    scents: "wild herbs, dusty earth, faint traces of fermentation",
                    textures: "gritty soil, weathered wood, tangled vines"
                },
                backstory: "Someone once loved this place deeply - evidence of care remains in the vineyard's bones",
                tension: "How much of this lost paradise can be restored?"
            },
            "The Tool Shed": {
                setting: "A weathered wooden shed stands among overgrown herb gardens",
                atmosphere: "nostalgic and hopeful, filled with the ghosts of past harvests",
                details: {
                    visual: "peeling paint, cobweb-covered windows, rusty hinges, scattered old tools",
                    sounds: "creaking door, scurrying mice, wind whistling through gaps",
                    scents: "old wood, dried herbs, rust, lingering wine barrels",
                    textures: "splintered wood, cold metal, dusty surfaces"
                },
                backstory: "This shed holds the memory of countless harvest seasons",
                tension: "What tools and wisdom from the past can help shape the future?"
            }
        };

        // Choice enhancement database
        this.choiceEnhancements = {
            "Examine gate closely": {
                description: "Take time to study the gate's construction, condition, and any details others might miss",
                outcomes: "You might discover hidden mechanisms, assess repair needs, or find clues about the vineyard's history"
            },
            "Check estate map": {
                description: "Consult your map to understand the vineyard's layout and boundaries", 
                outcomes: "This will give you crucial context about the scope and organization of the property"
            },
            "Ask friends' opinions": {
                description: "Turn to your companions for their perspectives and insights",
                outcomes: "Different viewpoints might reveal aspects you hadn't considered"
            },
            "Try to open immediately": {
                description: "Act on impulse and see if the gate will yield to gentle pressure",
                outcomes: "Sometimes direct action reveals more than careful planning"
            },
            "Explore the journal carefully": {
                description: "Study the vintner's notes for clues about wine-making techniques and vineyard history",
                outcomes: "Ancient wisdom might hold the key to restoration success"
            },
            "Investigate the vine rows": {
                description: "Walk among the vines to assess their condition and identify grape varieties",
                outcomes: "You'll learn about the vineyard's agricultural potential and challenges"
            },
            "Look for the main building": {
                description: "Search for the central winery or residence that anchored this operation",
                outcomes: "The main building might hold equipment, records, or living spaces to explore"
            },
            "Search for more clues about the family": {
                description: "Look for personal items, photos, or records that tell the human story of this place",
                outcomes: "Understanding the people who built this dream might inspire your own journey"
            }
        };
    }

    // Main parsing function - enhanced version of your existing parseStoryboardToGame
    parseStoryboardToGame(content) {
        console.log('🎮 Parsing enhanced storyboard format...');
        
        try {
            // Extract basic information
            const title = this.extractTitle(content);
            const coreTheme = this.extractCoreTheme(content);
            const setting = this.extractSetting(content);
            const characters = this.extractCharactersWithDetails(content);
            const scenes = this.extractScenesWithRichDescriptions(content);
            
            // Build enhanced game data
            const gameData = {
                title: title,
                coreTheme: coreTheme,
                setting: setting,
                characters: characters,
                scenes: scenes,
                visualStyle: this.extractVisualStyle(content),
                metadata: {
                    hasRichContent: true,
                    totalChoices: scenes.reduce((sum, scene) => sum + (scene.choices?.length || 0), 0),
                    hasFamilyMoments: scenes.some(scene => scene.familyMoment),
                    hasDiscoveries: scenes.some(scene => scene.discovery),
                    generatedAt: new Date().toISOString()
                }
            };

            console.log('✅ Enhanced parsing complete:', gameData);
            return gameData;
            
        } catch (error) {
            console.error('❌ Enhanced parsing failed:', error);
            throw new Error(`Enhanced parsing failed: ${error.message}`);
        }
    }

    extractTitle(content) {
        const titleMatch = content.match(/^#\s*(.+)/m);
        return titleMatch ? titleMatch[1].trim() : "Adventure Game";
    }

    extractCoreTheme(content) {
        const themeMatch = content.match(/\*\*Core Theme\*\*:\s*(.+)/);
        return themeMatch ? themeMatch[1].trim() : "An exciting adventure awaits";
    }

    extractSetting(content) {
        const settingMatch = content.match(/\*\*Setting\*\*:\s*(.+)/);
        return settingMatch ? settingMatch[1].trim() : "A mysterious location";
    }

    extractCharactersWithDetails(content) {
        const characterMatches = content.match(/###\s*(.+?)(?=###|\n##|\n#|$)/gs) || [];
        
        return characterMatches.map(match => {
            const nameMatch = match.match(/###\s*(.+)/);
            const personalityMatch = match.match(/\*\*Personality\*\*:\s*(.+)/);
            const abilityMatch = match.match(/\*\*Special Ability\*\*:\s*(.+)/);
            const arcMatch = match.match(/\*\*Character Arc\*\*:\s*(.+)/);
            const backgroundMatch = match.match(/\*\*(?:Family Dynamic|Background)\*\*:\s*(.+)/);

            const name = nameMatch ? nameMatch[1].trim() : "Character";
            
            return {
                name: name,
                personality: personalityMatch ? personalityMatch[1].trim() : "",
                ability: abilityMatch ? abilityMatch[1].trim() : "",
                arc: arcMatch ? arcMatch[1].trim() : "",
                background: backgroundMatch ? backgroundMatch[1].trim() : ""
            };
        }).filter(char => char.name && char.name !== "Character");
    }

    extractScenesWithRichDescriptions(content) {
        // Extract day patterns with enhanced parsing
        const dayPattern = /\*\*Day (\d+): "([^"]+)"\*\*([\s\S]*?)(?=\*\*Day \d+:|$)/g;
        const scenes = [];
        let match;
        
        while ((match = dayPattern.exec(content)) !== null) {
            const dayNumber = parseInt(match[1]);
            const title = match[2];
            const dayContent = match[3].trim();
            
            // Create rich scene description
            const scene = {
                dayNumber: dayNumber,
                title: title,
                description: this.generateRichDescription(title, dayContent),
                familyMoment: this.extractFamilyMoment(dayContent),
                discovery: this.extractDiscovery(dayContent),
                choices: this.extractAndEnhanceChoices(dayContent, title),
                mood: this.determineMood(dayContent)
            };
            
            scenes.push(scene);
        }
        
        return scenes.sort((a, b) => a.dayNumber - b.dayNumber);
    }

    generateRichDescription(sceneTitle, content) {
        const template = this.sceneTemplates[sceneTitle] || this.createGenericTemplate(content);
        const mood = this.determineMood(content);
        
        const moodAdjectives = {
            mysterious: ["enigmatic", "shadowed", "intriguing", "hidden"],
            peaceful: ["serene", "tranquil", "gentle", "harmonious"], 
            dramatic: ["intense", "urgent", "powerful", "striking"],
            celebratory: ["joyful", "vibrant", "triumphant", "festive"]
        };
        
        const adjective = this.selectRandom(moodAdjectives[mood] || moodAdjectives.peaceful);
        
        let description = `The ${adjective} scene unfolds before you: ${template.setting}, ${template.atmosphere}.\n\n`;
        description += `${template.details.visual} catches your eye, while ${template.details.sounds} create an atmospheric soundscape. `;
        description += `The air carries ${template.details.scents}, and everything feels textured - ${template.details.textures}.\n\n`;
        description += `${template.backstory}. ${template.tension}`;
        
        return description;
    }

    createGenericTemplate(content) {
        // Extract basic description from content for unknown scenes
        const lines = content.split('\n').filter(line => 
            line.trim() && 
            !line.includes('**') && 
            !line.includes('*') &&
            line.length > 20
        );
        
        const basicDescription = lines[0] || "A new area reveals itself to you";
        
        return {
            setting: basicDescription,
            atmosphere: "filled with possibility and gentle mystery",
            details: {
                visual: "interesting details catch your attention",
                sounds: "the ambient sounds of nature and time",
                scents: "fresh air with hints of earthiness and history", 
                textures: "varied surfaces telling stories of the past"
            },
            backstory: "This location holds stories waiting to be discovered",
            tension: "What will you choose to explore first?"
        };
    }

    extractFamilyMoment(content) {
        const familyMatch = content.match(/\*\*Family Moment\*\*:\s*(.+)/);
        return familyMatch ? familyMatch[1].trim() : null;
    }

    extractDiscovery(content) {
        const discoveryMatch = content.match(/\*\*Discovery\*\*:\s*(.+)/);
        return discoveryMatch ? discoveryMatch[1].trim() : null;
    }

    extractAndEnhanceChoices(content, sceneTitle) {
        // Look for choices in various formats
        const choicePatterns = [
            /\*\*Choices\*\*:\s*\[([^\]]+)\]/g,
            /(?:Choose|Options|Decisions):\s*([^\n]+)/gi,
            /- (.+?)(?=\n-|\n\*|\n$)/g
        ];
        
        let choices = [];
        
        // Try different patterns to extract choices
        for (const pattern of choicePatterns) {
            const matches = content.match(pattern);
            if (matches) {
                choices = matches.map(match => {
                    // Clean up the match to extract just the choice text
                    return match.replace(/\*\*Choices\*\*:\s*\[|\]|^-\s*/g, '').trim();
                }).filter(choice => choice.length > 0);
                
                if (choices.length > 0) break;
            }
        }
        
        // If no choices found, create default choices based on scene
        if (choices.length === 0) {
            choices = this.generateDefaultChoices(sceneTitle);
        }
        
        // Enhance choices with descriptions and character notes
        return choices.map(choiceText => {
            const enhancement = this.choiceEnhancements[choiceText] || {
                description: "A meaningful choice in your adventure",
                outcomes: "This choice will influence your story"
            };
            
            return {
                text: choiceText,
                description: enhancement.description,
                characterNotes: this.generateCharacterNotes(choiceText)
            };
        });
    }

    generateDefaultChoices(sceneTitle) {
        const defaultChoiceMap = {
            "The Hidden Gate": [
                "Examine gate closely",
                "Check estate map", 
                "Ask friends' opinions",
                "Try to open immediately"
            ],
            "First Steps": [
                "Explore the journal carefully",
                "Investigate the vine rows",
                "Look for the main building",
                "Search for more clues about the family"
            ],
            "The Tool Shed": [
                "Inventory the old tools",
                "Talk to the hardware store owner",
                "Explore the herb garden",
                "Plan restoration priorities"
            ]
        };
        
        return defaultChoiceMap[sceneTitle] || [
            "Explore thoroughly",
            "Ask friends for input", 
            "Take action immediately",
            "Plan your next steps"
        ];
    }

    generateCharacterNotes(choiceText) {
        const characterNotes = {};
        
        // Generate character-specific notes for each choice
        Object.keys(this.characterVoices).forEach(characterName => {
            const voice = this.characterVoices[characterName];
            
            if (choiceText.includes('examine') || choiceText.includes('study')) {
                characterNotes[characterName] = `Perfect for your ${voice.observationStyle} approach`;
            } else if (choiceText.includes('ask') || choiceText.includes('friends')) {
                characterNotes[characterName] = `Leverage your collaborative nature`;
            } else if (choiceText.includes('immediately') || choiceText.includes('action')) {
                characterNotes[characterName] = `Sometimes ${voice.language[0]} action is needed`;
            } else {
                characterNotes[characterName] = `A meaningful choice for your character`;
            }
        });
        
        return characterNotes;
    }

    determineMood(content) {
        const moodKeywords = {
            mysterious: ['mysterious', 'hidden', 'secret', 'ancient', 'forgotten', 'enigmatic'],
            peaceful: ['peaceful', 'serene', 'calm', 'gentle', 'quiet', 'tranquil'],
            dramatic: ['dramatic', 'intense', 'crisis', 'conflict', 'storm', 'urgent'],
            celebratory: ['celebration', 'festival', 'joy', 'complete', 'achievement', 'triumph']
        };
        
        const contentLower = content.toLowerCase();
        let maxScore = 0;
        let detectedMood = 'peaceful';
        
        for (const [mood, keywords] of Object.entries(moodKeywords)) {
            const score = keywords.filter(keyword => contentLower.includes(keyword)).length;
            if (score > maxScore) {
                maxScore = score;
                detectedMood = mood;
            }
        }
        
        return detectedMood;
    }

    extractVisualStyle(content) {
        return {
            colorPalettes: [],
            defaultMood: 'peaceful'
        };
    }

    selectRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    // Generate character perspective for a given character and scene
    generateCharacterPerspective(characterName, sceneTitle) {
        const voice = this.characterVoices[characterName];
        return voice ? voice.perspective : "You approach this situation with your unique perspective.";
    }
}

// Export for use in other files
window.EnhancedStoryboardGenerator = EnhancedStoryboardGenerator;

// Maintain backward compatibility with existing parseStoryboardToGame function
function parseStoryboardToGame(content) {
    const generator = new EnhancedStoryboardGenerator();
    return generator.parseStoryboardToGame(content);
}
