const groupsContainer = document.getElementById('groupsContainer');
const toggleNpcs = document.getElementById('toggleNpcs');
const toggleConnections = document.getElementById('toggleConnections');
const toggleNsfw = document.getElementById('toggleNsfw');
const bioModal = document.getElementById('bioModal');
const closeModal = document.getElementById('closeModal');
const bioName = document.getElementById('bioName');
const bioDetails = document.getElementById('bioDetails');
const bioBulletPoints = document.getElementById('bioBulletPoints');
const bioWeaknesses = document.getElementById('bioWeaknesses');
const bioStrengths = document.getElementById('bioStrengths');
const bioExtraImages = document.getElementById('bioExtraImages');
const carouselImages = document.getElementById('carouselImages');
const prevImage = document.getElementById('prevImage');
const nextImage = document.getElementById('nextImage');

const googleSearchSection = document.getElementById('googleSearchSection');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchSidebar = document.getElementById('searchSidebar');

toggleNpcs.checked = false; // Set NPC toggle off by default

let charactersData = [];
let currentImageIndex = 0;
let currentImages = [];

const randomPicture = (pictures) => pictures[Math.floor(Math.random() * pictures.length)];

const randomIndex = (arrayLength) => Math.floor(Math.random() * arrayLength);

const createTab = (name, contentElement) => {
    const tab = document.createElement('li');
    tab.innerText = name;
    tab.addEventListener('click', () => {
        // Remove active class from other tabs
        document.querySelectorAll('.tab-list li').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Hide other content sections
        document.querySelectorAll('.window-content > div').forEach(div => div.style.display = 'none');
        contentElement.style.display = 'flex';
    });
    return tab;
};

const populateTopBar = (container, topBarData) => {
    if (!topBarData) return; // Return early if no top bar data is provided

    const topBar = document.createElement('div');
    topBar.className = 'top-bar-container';

    const nameAndTags = document.createElement('div');
    nameAndTags.className = 'name-and-tags-together';

    const titleAndSubEl = document.createElement('div');
    titleAndSubEl.className = 'sidebar-and-title';


    const titleEl = document.createElement('div');
        titleEl.className = 'sidebar-title';
        titleEl.innerHTML = topBarData.title;
        titleAndSubEl.appendChild(titleEl);

        const subtitleEl = document.createElement('div');
        subtitleEl.className = 'sidebar-subtitle';
        subtitleEl.innerHTML = topBarData.subtitle;
        titleAndSubEl.appendChild(subtitleEl);

        nameAndTags.appendChild(titleAndSubEl);

        if(topBarData.tags){
        topBarData.tags.forEach(tag=>{
            const lilTag = document.createElement('div');
            lilTag.className = 'lil-tag-for-top-bar';
            lilTag.style.backgroundColor = topBarData.highlightColorHere;
            lilTag.style.border = '2px solid rgba(0, 0, 0, 0.3)';
            lilTag.innerHTML = tag;
            nameAndTags.appendChild(lilTag);
        })
        }

        topBar.appendChild(nameAndTags)

        const imagesEl = document.createElement('div');
        imagesEl.className = 'sidebar-images';

        const largeImageContainer = document.createElement('div');
        largeImageContainer.className = 'large-image-container';

        const largeImg = document.createElement('img');
        largeImg.src = topBarData.images[0];
        largeImg.className = 'large-image';

        largeImageContainer.appendChild(largeImg);
        imagesEl.appendChild(largeImageContainer);

        const smallImagesContainer = document.createElement('div');
        smallImagesContainer.className = 'small-images-container';
        let key = 0;
        topBarData.images.slice(1, 3).forEach(imgSrc => {
            
           const smallImagesContainerContains = document.createElement('div');
           smallImagesContainerContains.className = 'small-images-container-contains';
            const img = document.createElement('img');
            img.src = imgSrc;
            img.className = 'small-image-' + key;
            smallImagesContainerContains.appendChild(img);
            smallImagesContainer.appendChild(smallImagesContainerContains)
            key++;
        });

        imagesEl.appendChild(smallImagesContainer);
        topBar.appendChild(imagesEl);

        

    // Create a large container with an image and news
    const largeContainer = document.createElement('div');
    largeContainer.className = 'top-bar-large-container';
    largeContainer.style.backgroundColor = topBarData.highlightColorHere;
    if (topBarData.imageNews) {
        const newsImage = document.createElement('div');
        newsImage.className = 'top-bar-large-image';
        const largeImage = document.createElement('img');
        largeImage.src = topBarData.imageNews;
        newsImage.appendChild(largeImage);
        largeContainer.appendChild(newsImage);
    }
    
    if (topBarData.newsType) {
        const newsContainer = document.createElement('div');
        newsContainer.className = 'top-bar-news';
    
        // Check if the news type is 'youtube' or 'instagram'
        if (topBarData.newsType === 'youtube' || topBarData.newsType === 'instagram') {
            // Create a wrapper for the icon, platform name, and handle
            const headerContainer = document.createElement('div');
            headerContainer.className = 'news-header-container';
    
            // Create the small circle for the icon
            const iconContainer = document.createElement('div');
            iconContainer.className = 'news-icon-container';
    
            const iconImage = document.createElement('img');
            iconImage.src = `images/app_icons/${topBarData.newsType}.png`; // Icon path based on type
            iconContainer.appendChild(iconImage);
    
            const platformAndHandle = document.createElement('div');
            platformAndHandle.className = 'news-plataform-and-handle'

            // Add the platform name
            const platformName = document.createElement('span');
            platformName.className = 'news-platform-name';
            platformName.innerText = topBarData.newsType.charAt(0).toUpperCase() + topBarData.newsType.slice(1); // Capitalize first letter
            platformAndHandle.appendChild(platformName);
            // Add the handle
            const handle = document.createElement('span');
            handle.className = 'news-handle';
            handle.innerText = topBarData.handle || ''; // Display the handle from JSON or leave blank if not provided
            platformAndHandle.appendChild(handle);
    
            // Append icon, platform name, and handle to the header container
            headerContainer.appendChild(iconContainer);
            headerContainer.appendChild(platformAndHandle);
    
            // Add the fake title
            const fakeTitle = document.createElement('div');
            fakeTitle.className = 'news-fake-title';
            fakeTitle.innerText = topBarData.newsTitle || 'Untitled'; // Display the fake title from JSON or 'Untitled'
    
            // Add the description
            const newsDescription = document.createElement('div');
            newsDescription.className = 'news-description';
            newsDescription.innerHTML = topBarData.news || ''; // The actual news text

            const newsDate = document.createElement('div');
            newsDate.className = 'news-date';
            newsDate.innerHTML = topBarData.newsDate || '';
    
            // Append the header and other elements to the main news container
            newsContainer.appendChild(headerContainer);
            newsContainer.appendChild(fakeTitle);
            newsContainer.appendChild(newsDescription);
            newsContainer.appendChild(newsDate);
        } else {
            // Standard news handling
            newsContainer.innerHTML = topBarData.news;
        }
    
        largeContainer.appendChild(newsContainer);
    }
    
    
    
    topBar.appendChild(largeContainer);

    // Create two small containers for age/DOB and misc info

    const largeContainerRight = document.createElement('div');
    largeContainerRight.className = 'top-bar-right-container';

    const smallContainer1 = document.createElement('div');
    smallContainer1.className = 'top-bar-small-container';
    smallContainer1.innerHTML = `<strong>Born:</strong> ${topBarData.ageDob || 'N/A'}`;
    smallContainer1.style.backgroundColor = topBarData.highlightColorHere;

    const smallContainer2 = document.createElement('div');
    smallContainer2.className = 'top-bar-small-container';
    smallContainer2.innerHTML = topBarData.miscTop || 'N/A';
    smallContainer2.style.backgroundColor = topBarData.highlightColorHere;

    const wideContainer = document.createElement('div');
    wideContainer.className = 'top-bar-wide-container';

    if (topBarData.miscWidePic) {
        wideContainer.style.backgroundImage = `url(${topBarData.miscWidePic})`;
        wideContainer.style.backgroundSize = 'cover'; 
        wideContainer.style.backgroundPosition = 'center';
        
       wideContainer.className = 'top-bar-wide-container-with-pic';
    }

    wideContainer.innerHTML = topBarData.miscWide || 'N/A';
    wideContainer.style.backgroundColor = topBarData.highlightColorHere;

    largeContainerRight.appendChild(smallContainer1);
    largeContainerRight.appendChild(smallContainer2);
    largeContainerRight.appendChild(wideContainer);
    
    topBar.appendChild(largeContainerRight);

    container.appendChild(topBar);
};



const populateSearchResults = (container, searchResultsData) => {
    container.innerHTML = '';
    searchResultsData.forEach(result => {
        const resultItem = createSearchResultItem(result.title, result.url, result.description);
        container.appendChild(resultItem);
    });
};


const createSearchResultItem = (title, url, description) => {
    const item = document.createElement('div');
    item.className = 'search-result-item';

    const itemTitle = document.createElement('div');
    itemTitle.className = 'search-result-title';
    itemTitle.innerHTML = title;
    item.appendChild(itemTitle);

    const itemUrl = document.createElement('div');
    itemUrl.className = 'search-result-url';
    itemUrl.innerHTML = url;
    item.appendChild(itemUrl);

    const itemDescription = document.createElement('div');
    itemDescription.className = 'search-result-description';
    itemDescription.innerHTML = description;
    item.appendChild(itemDescription);

    return item;
};


const populateSearchSidebar = (container, sidebarInfo, relatedPeople) => {

    container.innerHTML = ''; // Clear previous sidebar content

        const aboutEl = document.createElement('div');
        aboutEl.className = 'sidebar-section';
        aboutEl.innerHTML = `<div class="sidebar-section-title">About</div><div class="sidebar-section-content">${sidebarInfo.about}</div>`;
        container.appendChild(aboutEl);

        if (sidebarInfo.tidbits) {
            Object.entries(sidebarInfo.tidbits).forEach(([title, content]) => {
                const tidbitEl = document.createElement('div');
                tidbitEl.className = 'sidebar-tidbit';
                
                tidbitEl.innerHTML = `
                    <div class="sidebar-inner-tidbit"><strong>${title}:</strong> ${content}</div>
                `;
                
                container.appendChild(tidbitEl);
            });
        }

        const horizonalDivider = document.createElement('div')
        horizonalDivider.className = 'horizonal-divider-light';
        container.appendChild(horizonalDivider)

        const relatedPeopleEl = document.createElement('div');
relatedPeopleEl.className = 'sidebar-section';
relatedPeopleEl.innerHTML = `<div class="search-for-title">People also search for</div>`;
const relatedPeopleContentEl = document.createElement('div');
relatedPeopleContentEl.className = 'related-people-content';

// Ensure that relatedPeople data exists and has up to four entries
if (sidebarInfo.relatedPeople && sidebarInfo.relatedPeople.length > 0) {
    sidebarInfo.relatedPeople.slice(0, 4).forEach(person => {
        const personEl = document.createElement('div');
        personEl.className = 'related-person';

        // Create and set the image
        const personImg = document.createElement('img');
        personImg.src = person.imageSrc;
        personImg.alt = person.name;
        personImg.className = 'related-person-image';

        // Create and set the name
        const personName = document.createElement('div');
        personName.className = 'related-person-name';
        personName.innerText = person.name;

        // Append image and name to the person element
        personEl.appendChild(personImg);
        personEl.appendChild(personName);

        // Append person element to the content container
        relatedPeopleContentEl.appendChild(personEl);
    });

    // Append the related people content to the main container
    relatedPeopleEl.appendChild(relatedPeopleContentEl);
    container.appendChild(relatedPeopleEl);

    const seeMoreNow = document.createElement('div');
    seeMoreNow.classList = 'see-more-now-b';
    seeMoreNow.innerHTML = "See more &#129122;"
    container.appendChild(seeMoreNow);
}
};




const historyPhone = document.getElementById('historyPhone');
const lockScreen = document.getElementById('lockScreen');
const homeScreen = document.getElementById('homeScreen');
const appScreen = document.getElementById('appScreen');
const phoneBackground = document.getElementById('phoneBackground');
const unlockPhone = document.getElementById('unlockPhone');
const backToHome = document.getElementById('backToHome');
const appContent = document.getElementById('appContent');
const lockDate = document.getElementById('lockDate');
const lockTime = document.getElementById('lockTime');
const appGrid = document.querySelector('.app-grid');
const appDock = document.querySelector('.app-dock');

const defaultApps = [
    { id: "facetimeApp", name: "Facetime", icon: "images/app_icons/facetime.png", interactive: false },
    { id: "callApp", name: "Call", icon: "images/app_icons/call.png", interactive: false },
    { id: "cameraApp", name: "Camera", icon: "images/app_icons/camera.png", interactive: false },
    { id: "photosApp", name: "Photos", icon: "images/app_icons/photos.png", interactive: true },
    { id: "mapsApp", name: "Google Maps", icon: "images/app_icons/maps.png", interactive: false },
    { id: "mailApp", name: "Mail", icon: "images/app_icons/mail.png", interactive: false },
    { id: "calendarApp", name: "Calendar", icon: "images/app_icons/calendar.png", interactive: false },
    { id: "settingsApp", name: "Settings", icon: "images/app_icons/settings.png", interactive: false }
];

const resetPhoneScreen = () => {
    // Clear all content and reset elements to the initial state
    const appGridElement = document.querySelector('.app-grid');
    const appDockElement = document.querySelector('.app-dock');
    const homeScreen = document.querySelector('.home-screen'); // Assuming this is your home screen element
    const appScreen = document.querySelector('.app-screen'); // Assuming this is the element for app content

    if (appGridElement) appGridElement.innerHTML = ''; // Clear the app grid
    if (appDockElement) appDockElement.innerHTML = ''; // Clear the app dock

    // Reset visibility to home screen
    if (homeScreen) homeScreen.style.display = 'flex'; // Show the home screen
    if (appScreen) appScreen.style.display = 'none'; // Hide the app screen or any open app content
};


function renderInstagramContent(character) {
    const instagramData = character.instagram;

    // Step 1: Filter out non-NPC connections and get their names
    const nonNpcConnections = character.connections
        .filter(connection => connection.type !== 'npc')
        .map(connection => connection.name.trim().toLowerCase());

    // Step 2: Find related characters with Instagram data
    const relatedCharacters = charactersData.filter(relatedChar => {
        const isRelated = nonNpcConnections.includes(relatedChar.displayName.trim().toLowerCase());
        const hasInstagram = relatedChar.instagram && relatedChar.instagram.posts;
        return isRelated && hasInstagram;
    });

    // Step 3: Check if the Instagram data exists and has posts
    if (!instagramData || !instagramData.posts) {
        console.error('Instagram data is incomplete:', instagramData);
        return '<div>Error loading Instagram content</div>';
    }

    console.log('Main Character Instagram Data:', instagramData);
    console.log('Related Characters:', relatedCharacters);

    // Step 4: Safely gather all posts, including from related characters
    const allPosts = [
        ...instagramData.posts.map(post => ({
            character: character.displayName,
            profilePicture: instagramData.profilePicture,
            username: instagramData.username,
            ...post
        })),
        ...relatedCharacters.flatMap(relatedChar => {
            if (relatedChar.instagram && relatedChar.instagram.posts) {
                return relatedChar.instagram.posts.map(post => ({
                    character: relatedChar.displayName,
                    profilePicture: relatedChar.instagram.profilePicture,
                    username: relatedChar.instagram.username,
                    ...post
                }));
            }
            return [];
        })
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    console.log('All Posts:', allPosts);

    // Step 5: Render the Instagram app content
    return `
        <div class="instagram-tabs">
            <div class="tab active" data-tab="activity"><img src="./images/app_icons/home-instagram-tab.png"></div>
            <div class="tab disabled-tab"><img src="./images/app_icons/search-instagram-tab.png"></div>
            <div class="tab disabled-tab"><img src="./images/app_icons/video-instagram-tab.png" style="width: 16px;"></div>
            <div class="tab disabled-tab"><img src="./images/app_icons/buy-instagram-tab.png" style="width: 15px;"></div>
            <div class="tab" data-tab="profile"><img src="${instagramData.profilePicture}" class="profile-picture"></div>
        </div>
        <div class="tab-content activity active">
            <div class="instagram-top-nav"><img src="./images/app_icons/instagram-top-bar.png"></div>
            <div class="stories-section">
                <div class="related-profile" data-name="${instagramData.username}">
                    <img src="${instagramData.profilePicture}" class="profile-picture">
                    <div class="profile-name">${instagramData.username}</div>
                </div>
                ${relatedCharacters.map(related => related.instagram && related.instagram.profilePicture ? `
                    <div class="related-profile" data-name="${related.displayName}">
                        <img src="${related.instagram.profilePicture}" class="profile-picture">
                        <div class="profile-name">${related.displayName}</div>
                    </div>
                ` : '').join('')}
            </div>
            <div class="posts-section">
                ${allPosts.map(post => `
                    <div class="post">
                        <div class="post-header">                        
                            <div class="post-info">
                                <img src="${post.profilePicture}" class="profile-picture">
                                <div class="post-author">${post.username}</div>
                                <div class="post-date" style="display:none;">${post.date}</div>
                            </div>
                            <img src="./images/app_icons/three-dots-more-info-instagram.png" class="three-dots-more-info-instagram">
                        </div>
                        <img src="${post.image}" class="post-image">
                        <img src="./images/app_icons/instagram-bottom-post-bar.png" class="instagram-bottom-post-bar">
                        <div class="post-footer">
                            <div class="post-likes">Liked by <strong>${post.speciallike}</strong> and <strong>${post.likes}</strong> others</div>
                            <div class="post-description"><strong>${post.username}:</strong> ${post.description}</div>
                            <div class="post-comments">
                                <!-- Render special comments -->
                                ${(post.specialComments || []).map(comment => `
                                    <div class="special-comment">
                                        <strong>${comment.specialCommenter}:</strong> ${comment.specialComment}
                                    </div>
                                `).join('')}
                                <a href="#" class="view-more-comments">View all ${post.comments - (post.specialComments ? post.specialComments.length : 0)} comments</a>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="tab-content profile">
            <div class="profile-tob-bar"><div class="profile-tob-bar-left-inst"><img src="./images/app_icons/go-back-top-bar-profile-instagram.png"><div class="profile-username">${instagramData.username}</div></div><img src="./images/app_icons/three-dots-more-info-instagram.png" class="three-dots-more-info-instagram"></div>
            <div class="profile-header">
                <img id="profile-picture" src="${instagramData.profilePicture}" class="profile-picture">
                <div class="profile-info">
                    
                    <div class="profile-stats">
                        <div class="profile-info-top-stats">${instagramData.posts.length} <div class="little-info-instagram-profile">posts</div></div>
                        <div class="profile-info-top-stats">${instagramData.followers} <div class="little-info-instagram-profile">followers</div></div>
                        <div class="profile-info-top-stats">${instagramData.following} <div class="little-info-instagram-profile">following</div></div>
                    </div>
                </div>
            </div>
            <div class="profile-memories">
                ${instagramData.memories.map(memory => `
                    <div class="memory" data-images='${JSON.stringify(memory.images)}'>
                        <img src="${memory.thumbnail}" class="memory-image">
                        <div class="memory-title">${memory.title}</div>
                    </div>
                `).join('')}
            </div>
            <div class="profile-posts">
                ${instagramData.posts.map(post => `
                    <img src="${post.image}" class="profile-post-image">
                `).join('')}
            </div>
        </div>
    `;
}

const renderGrindrContent = (character) => {
    const grindrData = character.grindr;

    if (!grindrData) {
        console.error('Grindr data not found for character:', character);
        return '<div>Error loading Grindr content</div>';
    }

    const profilesHtml = grindrData.profiles.map(profile => `
        <div class="grindr-profile-card" style="background-image: url(${profile.picture})">
            <p>${profile.name}</p>
        </div>
    `).join('');

    const messagesHtml = grindrData.messages.map(message => `
        <div class="grindr-message-item" onclick="openMessage('${character.displayName}', '${message.name}', 'grindr', '${message.name}')">
            <img src="${message.profilePicture}" alt="${message.name}">
            <div class="grindr-texts-thingamajig">
                <div class="grindr-message-name">${message.name}</div>
                <div class="grindr-message-time">${message.time}</div>
                <div class="grindr-latest-message">${message.latestMessage}</div>
                <div class="grindr-new-message-count">${message.newMessageCount}</div>
            </div>
        </div>
    `).join('');

    return `
        <div class="grindr">
            <div class="tabs grindr-tabs">
                <div class="tab grindr-tab active" data-tab="browse"><img src="./images/app_icons/mask-grindr.png"></div>
                <div class="tab grindr-tab disabled-tab"><img src="./images/app_icons/star-grindr.png"></div>
                <div class="tab grindr-tab disabled-tab"><img src="./images/app_icons/xtra-grindr.png"></div>
                <div class="tab grindr-tab" data-tab="messages"><img src="./images/app_icons/message-grindr.png"></div>
            </div>
            <div class="tab-content browse active">
                <div class="grindr-top-bar">
                    <div class="grindr-top-bar-left">
                        <div class="grindr-profile-picture">
                            <img src="${grindrData.profile.profilePicture}" alt="Profile Picture">
                        </div>
                        <div class="grindr-explore-bar">Explore</div>
                    </div>
                    <div class="grindr-views-bar"><img src="./images/app_icons/eye-grindr-views.png">${grindrData.profile.views}</div>
                </div>
                <div class="grindr-filters">
                    <button class="grindr-filter-button"><img src="./images/app_icons/filtering-grindr-filter.png"></button>
                    <button class="grindr-filter-button">Online</button>
                    <button class="grindr-filter-button">Age</button>
                    <button class="grindr-filter-button">Position</button>
                    <button class="grindr-filter-button">Fresh</button>
                </div>
                <div class="grindr-profiles-grid">
                    ${profilesHtml}
                </div>
            </div>
            <div class="tab-content messages">
                <div class="grindr-top-bar-messages">Inbox<img src="./images/app_icons/filtering-grindr-filter.png"></div>
                <div class="grindr-message-tabs">
                    <div class="grindr-message-tab active">Messages</div>
                    <div class="grindr-message-tab">Taps</div>
                    <div class="grindr-message-tab">Albums</div>
                </div>
                <div class="grindr-message-list">
                    ${messagesHtml}
                </div>
                <div class="grindr-message-box"></div>
            </div>
        </div>
    `;
};

const renderMessagesContent = (character) => {
    if (!character || !character.displayName) {
        console.error('Character or displayName is missing:', character);
        return '<div>Error loading messages content</div>';
    }

    const thefuckingScreen = document.querySelector('#appContent');
    thefuckingScreen.innerHTML = ''; // clearing the screen

    const characterName = character.displayName.trim();
    console.log('Rendering messages for character:', characterName);

    // Fetch character's own messages data
    const characterMessages = (character.messages && character.messages.messages) || [];

    // Get saved images for profile pictures
    const savedImages = (character.messages && character.messages.savedImages) || [];

    // Function to get profile picture from savedImages
    const getProfilePicture = (name) => {
        const image = savedImages.find(img => img.name === name);
        if (!image) {
            console.warn(`Profile picture not found for: ${name}`);
            return './images/default-profile.png'; // Default profile picture if not found
        }
        return image.profilePicture;
    };

    // Function to get the "saved as" name or default name
    const getSavedAsName = (name) => {
        const image = savedImages.find(img => img.name === name);
        return image && image['saved as'] ? image['saved as'] : name;
    };

    // Function to generate the group icon
    const generateGroupIcon = (participants) => {
        const participantImages = participants.map(name => getProfilePicture(name));
        const participantIcons = participantImages.map(img => `<img src="${img}" class="group-participant-icon">`).join('');
        
        return `
            <div class="group-icon">
                ${participantIcons}
            </div>
        `;
    };

    // Get related characters
    const relatedCharacters = charactersData.filter(relatedChar =>
        character.connections.some(connection => connection.name === relatedChar.displayName)
    );

    // Find messages involving the character from related people
    const relatedMessages = relatedCharacters.flatMap(relatedChar => {
        const messagesWithCharacter = (relatedChar.messages?.messages || []).filter(message =>
            message.participants && message.participants.includes(characterName) // Ensure participants exist
        );

        // Adjust messages for display from the character's perspective
        return messagesWithCharacter.map(message => {
            const isGroup = message.type === 'group';
            const otherParticipants = (message.participants || []).filter(p => p !== characterName); // Ensure participants exist
            const messageName = isGroup ? message.groupName : otherParticipants.join(' & ');

            // Adjust conversations to show the correct "from" and "to"
            const conversations = (message.conversations || message.conversation || []).map(convo => ({
                ...convo,
                from: convo.from === characterName ? 'character' : convo.from,
                to: convo.to === characterName ? 'character' : convo.to
            }));

            return {
                ...message,
                name: messageName,
                character: relatedChar.displayName,
                conversation: conversations
            };
        });
    });

    // Remove duplicate messages from related characters by using a unique identifier (e.g., name or groupName)
    const uniqueMessages = new Map();

    characterMessages.forEach(message => uniqueMessages.set(message.name || message.groupName, {
        ...message,
        character: character.displayName,
    }));

    relatedMessages.forEach(message => {
        if (!uniqueMessages.has(message.name || message.groupName)) {
            uniqueMessages.set(message.name || message.groupName, message);
        }
    });

    // Convert the map back to an array
    const allMessages = Array.from(uniqueMessages.values());

    // Sort all messages by date (newest to oldest)
    const sortedMessages = allMessages.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Ensure that character.messages is properly populated for openMessage to find it
    character.messages.messages = sortedMessages; // This is crucial for `openMessage` to find the correct data

    // Generate HTML for favorite people
    const favoritesHtml = sortedMessages
    .filter(msg => msg.isFavorite)
    .map(fav => {
        const participant = fav.participants.find(p => p !== character.displayName);
        const profilePicture = getProfilePicture(participant);
        const savedAsName = getSavedAsName(participant); // Use the function to get the "saved as" name or default

        const generateGroupIcon = (participants) => {
            const participantImages = participants.map(name => getProfilePicture(name));
            const participantIcons = participantImages.map(img => `<img src="${img}" class="group-participant-icon">`).join('');
            
            return `
                <div class="group-icon-fave">
                    ${participantIcons}
                </div>
            `;
        };

        // Handle cases where the participant might not have a proper identifier
        const messageIdentifier = fav.type === 'group' ? fav.groupName : participant;
        const picOrGroup = fav.type === 'group' 
            ? generateGroupIcon(fav.participants.filter(p => p !== character.displayName)) 
            : `<img src="${profilePicture}" alt="${savedAsName}">`;

        return `
            <div class="messages-favorite-person" onclick="openMessagesMessage('${character.displayName}', '${messageIdentifier}')">
                ${picOrGroup}
                <span>${savedAsName}</span>
            </div>
        `;
    }).join('');


    // Generate HTML for messages list
    const messagesHtml = sortedMessages.map(message => {
        const messageIdentifier = message.type === 'group' ? message.groupName : message.participants.find(p => p !== characterName);

        // Generate the group icon or get individual profile picture
        const profilePictureHtml = message.type === 'group' 
            ? generateGroupIcon(message.participants) // Generate group icon
            : `<img src="${getProfilePicture(messageIdentifier)}" alt="${messageIdentifier}" class="messages-profile-picture">`; 

        const savedAsName = message.type === 'group' 
            ? message.groupName 
            : getSavedAsName(messageIdentifier); // Get "saved as" name

        const lastMessageTime = new Date(message.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format the last message time

        return `
            <div class="messages-message-item" onclick="openMessagesMessage('${character.displayName}', '${messageIdentifier}')">
                <div class="messages-message-left">
                    ${profilePictureHtml}
                </div>
                <div class="messages-message-right">
                    <div class="messages-message-header">
                        <span class="messages-participant-name">${savedAsName}</span>
                        <span class="messages-time">${lastMessageTime}</span>
                    </div>
                    <div class="messages-latest-message">${message.latestMessage}</div>
                </div>
            </div>
        `;
    }).join('');

    // Return the HTML content for the Messages app
    return `
        <div class="messages" style="overflow-y: scroll; overflow-x: hidden; height: 560px;">
            <!-- Top bar with edit options -->
            <div class="messages-top-bar">
                <div class="messages-top-bar-smaller">Edit</div>
                <div class="messages-top-bar-item">Messages</div>
                <div class="messages-top-bar-smaller"><img src="./images/app_icons/edit-picture-topbar-messages.png" class="edit-picture-icon"></div>
            </div>

            <!-- Fake search box -->
            <div class="messages-search-box">
                <img src="./images/app_icons/search-topbar-imessages.png" class="edit-picture-icon">
                <input type="text" placeholder="Search" disabled class="fake-search-input">
                <img src="./images/app_icons/speak-topbar-imessages.png" class="edit-picture-icon">
            </div>

            <!-- Messages content -->
            <div class="messages-content">
                <div class="messages-favorite-grid">
                    ${favoritesHtml}
                </div>
                <div class="messages-message-list">
                    ${messagesHtml}
                </div>
                <div class="messages-message-box"></div>
            </div>
        </div>
    `;
};

const openMessagesMessage = (characterName, messageIdentifier) => {
    // Find the character by their display name
    const character = charactersData.find(char => char.displayName === characterName);

    if (!character) {
        console.error(`Character data not found for name: ${characterName}`);
        return;
    }

    // Access messages for the Messages app
    const messagesData = character.messages.messages;

    if (!messagesData || !Array.isArray(messagesData)) {
        console.error(`Messages data not found or invalid for character: ${characterName}`, messagesData);
        return;
    }

    // Find the specific message using participants or groupName
    const messageData = messagesData.find(msg => {
        const isGroupMessage = msg.type === 'group' && msg.groupName === messageIdentifier;
        const isIndividualMessage = msg.type === 'individual' && msg.participants.includes(messageIdentifier);
        return isGroupMessage || isIndividualMessage;
    });

    if (!messageData) {
        console.error(`Message data not found for identifier: ${messageIdentifier}`);
        return;
    }

    // Get saved images for profile pictures
    const savedImages = character.messages.savedImages || [];
    const getProfilePicture = (name) => savedImages.find(img => img.name === name)?.profilePicture || './images/default-profile.png';
    const getSavedAsName = (name) => {
        const image = savedImages.find(img => img.name === name);
        return image && image['saved as'] ? image['saved as'] : name;
    };

    // Function to generate the group icon
    const generateGroupIcon = (participants) => {
        const participantImages = participants.map(name => getProfilePicture(name));
        const participantIcons = participantImages.map(img => `<img src="${img}" class="group-participant-icon">`).join('');
        
        return `
            <div class="group-icon">
                ${participantIcons}
            </div>
        `;
    };

    // Determine the message box class for Messages app
    const messageBox = document.querySelector('.messages-message-box');
    if (!messageBox) {
        console.error('Message box element not found.');
        return;
    }

    // Define message classes for Messages app
    const messageSentClass = 'messages-message-sent';
    const messageReceivedClass = 'messages-message-received';
    const messageSentGroupClass = 'messages-message-sent-group';
    const messageReceivedGroupClass = 'messages-message-received-group';
    const infoMessageClass = 'messages-info';
    const messageHeaderClass = 'inside-messages-message-header';
    const closeMessageArrowClass = 'close-message-arrow-messages';

    // Handle both individual and group messages
    const conversations = messageData.conversation || messageData.conversations || [];
    
    const isGroupConversation = messageData.type === 'group';
    let lastSender = null; // To keep track of the last sender

    const conversationHtml = conversations.map((msg, index) => {
        // Determine if the current message is sent or received based on 'from' field
        const isSent = msg.from === 'character' || msg.from === characterName;
        const messageClass = isGroupConversation
            ? (isSent ? messageSentGroupClass : messageReceivedGroupClass) // Use group-specific classes
            : (isSent ? messageSentClass : messageReceivedClass);
        const profilePictureClass = isGroupConversation
            ? (isSent ? 'message-profile-picture-sent' : 'message-profile-picture-received') // Use specific classes for group message profile pictures
            : 'message-profile-picture';
        const savedAsName = getSavedAsName(msg.from);

        const senderProfilePicture = getProfilePicture(msg.from);

        // Check if the current message is from the same sender as the last one
        const isSameSenderAsLast = msg.from === lastSender;
        lastSender = msg.from; // Update lastSender for the next iteration

        if (msg.info) {
            // Render info messages differently
            return `<div class="${infoMessageClass}">${msg.info}</div>`;
        }

        const additionalClass = isSameSenderAsLast ? 'slight-edit' : ''; // Add slight-edit class if the sender is the same

        // Render differently for individual and group conversations
        if (isGroupConversation) {
            // For group messages, show profile picture and sender's name only for the first message from the sender
            return `
                <div class="${isSameSenderAsLast ? (isSent ? messageSentClass : messageReceivedClass) + " " + additionalClass : messageClass}">
                    ${!isSameSenderAsLast ? `<img src="${senderProfilePicture}" alt="${msg.from}" class="${profilePictureClass}">` : ''}
                    ${!isSameSenderAsLast ? `<span class="message-sender-name">${savedAsName}</span>` : ''}
                    ${msg.text}
                </div>
            `;
        } else {
            // For individual messages, no profile picture per message
            return `
                <div class="${messageClass}">
                    ${msg.text}
                </div>
            `;
        }
    }).join('');

    // Generate group icon for the top bar if it's a group conversation
    const groupIconHtml = isGroupConversation ? generateGroupIcon(messageData.participants) : '';

    // Set up top bar content for Messages app
    let topBarContent = `
        <span class="${closeMessageArrowClass}" onclick="closeMessage('messages')"><img src="./images/app_icons/inside-messages-message-goback.png"></span>
        <div class="messages-message-info-wrapper">
        ${isGroupConversation ? groupIconHtml : `<img src="${getProfilePicture(messageData.participants.find(p => p !== characterName))}" alt="${messageData.name}">`}
        <div class="messages-message-info">
            <div class="messages-message-name">${isGroupConversation ? messageData.groupName : getSavedAsName(messageData.participants.find(p => p !== characterName))}</div>
        </div>
        </div>
        <img src="./images/app_icons/inside-messages-message-facetime.png">
    `;

    // Insert the customized or default top bar content
    messageBox.innerHTML = `
        <div class="${messageHeaderClass}">
            ${topBarContent}
        </div>
        <div class="messages-message-conversation">${conversationHtml}</div>
    `;
    messageBox.style.display = 'flex';
};
















const openMessage = (characterName, messageName, appName) => {
    // Find the character by their display name
    const character = charactersData.find(char => char.displayName.toLowerCase() === characterName.toLowerCase());

    if (!character) {
        console.error(`Character data not found for name: ${characterName}`);
        return;
    }

    // Access the correct app data based on the appName parameter
    const appData = character[appName];

    if (!appData || !appData.messages) {
        console.error(`${appName} data or messages not found for character: ${characterName}`, appData);
        return;
    }

    const messageData = appData.messages.find(msg => msg.name === messageName);


    console.log(`Hi i'm messageName: `,messageName);
    if (!messageData) {
        console.error(`Message data not found for ID: ${message.name}`, appData.messages);
        return;
    }

    // Determine the message box class based on the app name
    const messageBoxClass = `${appName}-message-box`;
    const messageBox = document.querySelector(`.${messageBoxClass}`);
    if (!messageBox) {
        console.error('Message box element not found.');
        return;
    }

    // Define message classes dynamically based on the app
    const messageSentClass = `${appName}-message-sent`;
    const messageReceivedClass = `${appName}-message-received`;
    const messageHeaderClass = `${appName}-message-header`;
    const closeMessageArrowClass = `close-message-arrow-${appName}`;

    // Handle both conversation formats
    const conversations = messageData.conversation || messageData.conversations;

    const conversationHtml = conversations.map(msg => `
        <div class="${msg.from === 'character' ? messageSentClass : messageReceivedClass}">
            ${msg.text} <span class="time">${msg.time}</span>
        </div>
    `).join('');

    // Default top bar content
    let topBarContent = `
        <span class="${closeMessageArrowClass}" onclick="closeMessage('${appName}')">&#8592;</span>
        <div class="${appName}-message-info-wrapper">
        <img src="${messageData.profilePicture}" alt="${messageData.name}">
        <div class="${appName}-message-info">
            <div class="${appName}-message-name">${messageData.name}</div>
            ${appName === 'grindr' ? `<div class="message-grindr-info-distance">${messageData.distance}</div>` : ''}
        </div>
        </div>
        <span  class="grindr-filter-button-message"><img src="./images/app_icons/filtering-grindr-filter.png"></span>
    `;

    // App-specific customizations
    if (appName === 'tinder') {
        topBarContent = `
            <span class="${closeMessageArrowClass}" onclick="closeMessage('${appName}')"><img src="./images/app_icons/tinder-goback-topbar-message.png"></span>
        <div class="${appName}-message-info-wrapper">
        <img src="${messageData.profilePicture}" class="profile-picture-in-top-bar-i-hate-everything">
        <div class="${appName}-message-info">
            <div class="${appName}-message-name">${messageData.name}</div>
        </div>
        </div>
        <span class="tinder-filter-button-message"><img src="./images/app_icons/tinder-three-dots-topbar-message.png"></span>
`;
    }

    // Insert the customized or default top bar content
    messageBox.innerHTML = `
        <div class="${messageHeaderClass}">
            ${topBarContent} <!-- Use the customized or default top bar -->
        </div>
        <div class="${appName}-message-conversation">${conversationHtml}</div>
    `;
    messageBox.style.display = 'flex';
};


// Function to close the message box
const closeMessage = (appName) => {
    const messageBox = document.querySelector(`.${appName}-message-box`);
    if (messageBox) {
        messageBox.style.display = 'none'; // Hide the message box
    }
};

const renderTinderContent = (character) => {
    const tinderData = character.tinder;

    if (!tinderData) {
        console.error('Tinder data not found for character:', character);
        return '<div>Error loading Tinder content</div>';
    }

    // Generate HTML for the images
    const imagesHtml = tinderData.pictures.map((picture, index) => `
        <div class="tinder-image" data-index="${index}" style="background-image: url('${picture}'); display: ${index === 0 ? 'block' : 'none'};"></div>
    `).join('');

    // Generate HTML for the picture indicators
    const pictureIndicatorsHtml = tinderData.pictures.map((_, index) => `
        <div class="tinder-picture-indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
    `).join('');

    // Generate HTML for the messages list
    const messagesHtml = tinderData.messages.map(message => `
        <div class="tinder-message-item" onclick="openMessage('${character.displayName}', '${message.name}', 'tinder', '${message.name}')">
            <img src="${message.profilePicture}" alt="${message.name}">
            <div class="tinder-message-info-wrapper">
            <div class="tinder-message-name">${message.name}</div>
            <div class="tinder-message-time">${message.time}</div>
            <div class="tinder-latest-message">${message.latestMessage}</div>
            <div class="tinder-new-message-count">${message.newMessageCount}</div>
            </div>
        </div>
    `).join('');

    const bioHtml = tinderData.bio ? `<div class="tinder-bio">${tinderData.bio}</div>` : '';
    const tagsHtml = character.tinder.tags
    ? `<div class="tinder-tags">
         ${character.tinder.tags.map(tag => `<span class="tinder-tag">${tag}</span>`).join('')}
       </div>`
    : '';

    // Return the complete HTML content for the Tinder app
    return `
        <div class="tinder">
            <div class="tabs tinder-tabs">
                <div class="tab tinder-tab active" data-tab="browse"><img src="./images/app_icons/tinder-horizonal-fire-tab.png"></div>
                <div class="tab tinder-tab disabled-tab"><img src="./images/app_icons/tinder-horizonal-findnear-tab.png"></div>
                <div class="tab tinder-tab disabled-tab"><img src="./images/app_icons/tinder-findwholikesyou-tab.png"></div>
                <div class="tab tinder-tab" data-tab="messages"><img src="./images/app_icons/tinder-messages-tab.png"></div>
                <div class="tab tinder-tab disabled-tab"><img src="./images/app_icons/tinder-profile-tab.png"></div>
            </div>
            <div class="tab-content browse active">
                <div class="tinder-image-container" onclick="handleImageClick(event)">
                    ${imagesHtml}
                    <div class="tinder-picture-indicators">
                        ${pictureIndicatorsHtml}
                    </div>
                </div>
                <div class="tinder-bio-container" data-character-name="${tinderData.name}">
                    <div class="tinder-name-age">
                        <div class="age-name-wrapper">
                            <span class="tinder-name">${tinderData.name}</span> 
                            <span class="tinder-age">${tinderData.age}</span>
                        </div>
                        <img src="./images/app_icons/tinder-info-expand.png" class="tinder-bio-expand" onclick="expandTinderBio()">
                    </div>
                    <div class="tinder-bio-tags">
                        ${bioHtml}
                        ${tagsHtml}
                    </div>
                </div>
            </div>
            <div class="tab-content messages">
                <div class="tinder-message-top-bar">
    <div class="search-container">
        <img src="./images/app_icons/search-nobg.png" alt="Search Icon" class="search-icon">
        <input type="text" class="search-input" placeholder="Search matches">
    </div>
                </div>
                <div class="tinder-message-list">
                    ${messagesHtml}
                </div>
                <div class="tinder-message-box"></div>
            </div>
        </div>
    `;
};


const expandTinderBio = () => {
    const tinderBioContainer = document.querySelector('.tinder-bio-container');
    const tabContent = document.querySelector('.tab-content.browse');

    if (!tinderBioContainer || !tabContent) {
        console.error('Tinder bio container or tab content not found.');
        return;
    }

    // Make the tab content scrollable
    tabContent.classList.add('scrollable');

    // Switch classes to manage different states
    tinderBioContainer.classList.remove('tinder-bio-container');
    tinderBioContainer.classList.add('tinder-bio-container-expanded');

    // Get the name and age directly using their class selectors
    const characterName = tinderBioContainer.querySelector('.tinder-name').textContent.trim();
    const characterAge = tinderBioContainer.querySelector('.tinder-age').textContent.trim();
    const character = charactersData.find(char => char.tinder && char.tinder.name === characterName);

    if (!character || !character.tinder) {
        console.error(`Character or Tinder data not found for name: ${characterName}`);
        return;
    }

    let expandedContent = `<div class="tinder-name-age-expanded"><div class="age-name-wrapper">${characterName} <span>${characterAge}</div></span><button class="tinder-collapse-button" onclick="collapseTinderBio()"><img src="./images/app_icons/tinder-info-expand.png"></button></div>`; 

    // Add each extra bio section if available
    const sections = [
        { key: 'aboutMe', label: 'About Me' }, //if you forget, dumbass, the difference between about me and bio is size
        { key: 'interests', label: 'Interests' },
        { key: 'lookingFor', label: 'Looking for' },
        { key: 'pronouns', label: 'Pronouns' },
        { key: 'height', label: 'Height' },
        { key: 'relationshipType', label: 'Relationship type' },
        { key: 'languagesIKnow', label: 'Languages I know' },
        { key: 'basics', label: 'Basics' },
        { key: 'lifestyle', label: 'Lifestyle' },
        { key: 'myAnthem', label: 'My Anthem' }
    ];

    // Mapping of basic and lifestyle keys to their human-readable labels
    const basicsLabels = {
        zodiac: 'Zodiac',
        education: 'Education',
        familyPlans: 'Family Plans',
        personalityType: 'Personality Type',
        communication: 'Communication',
        loveStyle: 'Love Style'
    };

    const lifestyleLabels = {
        pets: 'Pets',
        drinking: 'Drinking',
        smoking: 'Smoking',
        workout: 'Workout',
        dietaryPreference: 'Dietary Preference',
        socialMedia: 'Social Media',
        sleepingHabits: 'Sleeping Habits'
    };

    sections.forEach(section => {
        if (character.tinder[section.key]) {
            if (section.key === 'basics' || section.key === 'lifestyle') {
                // Use appropriate labels for basics and lifestyle sections
                const labels = section.key === 'basics' ? basicsLabels : lifestyleLabels;
                expandedContent += `<div class="tinder-section tinder-section-${section.key}">`;
                expandedContent += `<span class="tinder-section-label">${section.label}</span><br>`;

                // Iterate over the basics or lifestyle object and render each key-value pair
                Object.entries(character.tinder[section.key]).forEach(([key, value]) => {
                    const label = labels[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                    expandedContent += `
                        <div class="tinder-${section.key}-item">
                            <span class="tinder-${section.key}-key">${label}</span>
                            <span class="tinder-${section.key}-value">${value}</span>
                        </div>`;
                });

                expandedContent += '</div>';
            } else if (section.key === 'interests') {
                // Render interests with each interest wrapped in a span
                const interests = Array.isArray(character.tinder[section.key])
                    ? character.tinder[section.key]
                    : character.tinder[section.key].split(',');

                const interestsHtml = interests
                    .map(interest => `<div class="tinder-interest-tag">${interest.trim()}</div>`)
                    .join(' ');

                expandedContent += `
                    <div class="tinder-section tinder-section-${section.key}">
                        <span class="tinder-section-label-${section.key}">${section.label}</span> 
                        ${interestsHtml}
                    </div>`;
            } else {
                // Normal section rendering
                expandedContent += `
                    <div class="tinder-section tinder-section-${section.key}">
                        <span class="tinder-section-label">${section.label}</span>
                        ${character.tinder[section.key]}
                    </div>`;
            }
        }
    });

    // Wrap the expanded content in a container that is scrollable
    tinderBioContainer.innerHTML = `
        <div class="tinder-expanded-content-wrapper">
            <div class="tinder-image-container" onclick="handleImageClick(event)">
                ${character.tinder.pictures.map((picture, index) => `
                    <div class="tinder-image" data-index="${index}" style="background-image: url('${picture}'); display: ${index === 0 ? 'block' : 'none'};"></div>
                `).join('')}
                <div class="tinder-picture-indicators">
                    ${character.tinder.pictures.map((_, index) => `
                        <div class="tinder-picture-indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
                    `).join('')}
                </div>
            </div>
            
            ${expandedContent}
        </div>
    `;
};


const collapseTinderBio = () => {
    // Select the expanded Tinder bio container
    const tinderBioContainer = document.querySelector('.tinder-bio-container-expanded');
    const tabContent = document.querySelector('.tab-content.browse');

    if (!tinderBioContainer || !tabContent) {
        console.error('Expanded Tinder bio container or tab content not found.');
        return;
    }

    // Make the tab content not scrollable again
    tabContent.classList.remove('scrollable');

    // Switch classes to manage different states
    tinderBioContainer.classList.remove('tinder-bio-container-expanded');
    tinderBioContainer.classList.add('tinder-bio-container');

    // Clear all the content inside the tinderBioContainer
    tinderBioContainer.innerHTML = '';

    // Find the character by name
    const characterName = tinderBioContainer.getAttribute('data-character-name');
    const character = charactersData.find(char => char.tinder && char.tinder.name === characterName);

    if (!character || !character.tinder) {
        console.error(`Character or Tinder data not found for name: ${characterName}`);
        return;
    }

    // Create the original content elements
    const nameAgeDivWrapper = document.createElement('div');
    nameAgeDivWrapper.className = 'tinder-name-age-wrapper';
    nameAgeDivWrapper.innerHTML = `
        <span class="tinder-name">${character.tinder.name}</span> 
        <span class="tinder-age">${character.tinder.age}</span>
    `;

    const nameAgeDiv = document.createElement('div');
    nameAgeDiv.className = 'tinder-name-age';
    nameAgeDiv.appendChild(nameAgeDivWrapper)

    nameAgeDiv.innerHTML += `
        <img src="./images/app_icons/tinder-info-expand.png" class="tinder-bio-expand" onclick="expandTinderBio()">
    `;

    const bioHtml = character.tinder.bio ? `<div class="tinder-bio">${character.tinder.bio}</div>` : '';
    const tagsHtml = character.tinder.tags
    ? `<div class="tinder-tags">
         ${character.tinder.tags.map(tag => `<span class="tinder-tag">${tag}</span>`).join('')}
       </div>`
    : '';

    const bioTagsDiv = document.createElement('div');
    bioTagsDiv.className = 'tinder-bio-tags';
    bioTagsDiv.innerHTML = ` ${bioHtml}
                        ${tagsHtml}
    `

    // Append the original elements back into the tinderBioContainer
    tinderBioContainer.appendChild(nameAgeDiv);
    tinderBioContainer.appendChild(bioTagsDiv);

    // Reset image container visibility
    const imageContainer = document.querySelector('.tinder-image-container');
    if (imageContainer) {
        imageContainer.style.display = 'block'; // Show the original image container again
    }
};




// Function to handle image navigation in the Tinder app
const handleImageClick = (event) => {
    const imageContainer = event.currentTarget;
    const images = imageContainer.querySelectorAll('.tinder-image');
    const indicators = imageContainer.querySelectorAll('.tinder-picture-indicator');

    let currentIndex = Array.from(images).findIndex(img => img.style.display === 'block');

    const clickX = event.clientX - imageContainer.getBoundingClientRect().left;
    const containerWidth = imageContainer.offsetWidth;

    if (clickX > containerWidth / 2) {
        // Right side click, go to the next picture
        currentIndex = (currentIndex + 1) % images.length;
    } else {
        // Left side click, go to the previous picture
        currentIndex = (currentIndex - 1 + images.length) % images.length;
    }

    // Update images and indicators
    images.forEach((img, index) => img.style.display = index === currentIndex ? 'block' : 'none');
    indicators.forEach((indicator, index) => indicator.classList.toggle('active', index === currentIndex));
};

const openTinderMessage = (characterName, messageName) => {
    // Find the character by their display name
    const character = charactersData.find(char => char.displayName.toLowerCase() === characterName.toLowerCase());

    if (!character) {
        console.error(`Character data not found for name: ${characterName}`);
        return;
    }

    const tinderData = character.tinder; // Access Tinder data within the character data

    if (!tinderData) {
        console.error(`Tinder data not found for character: ${characterName}`);
        return;
    }

    const messageData = tinderData.messages.find(msg => msg.name === messageName);

    if (!messageData) {
        console.error(`Message data not found for name: ${messageName}`);
        return;
    }

    // Use specific class for Tinder message box and ensure it exists in the current context
    const messageBox = document.querySelector('.tinder-message-box');
    if (!messageBox) {
        console.error('Message box element not found.');
        return;
    }

    const conversationHtml = messageData.conversation.map(msg => `
        <div class="${msg.from === 'character' ? 'tinder-message-sent' : 'tinder-message-received'}">
            ${msg.text} <span class="time">${msg.time}</span>
        </div>
    `).join('');

    messageBox.innerHTML = `
        <div class="tinder-message-header">
            <button class="tinder-back-button" onclick="closeTinderMessage()">&#8592;</button>
            <img src="${messageData.profilePicture}" alt="${messageData.name}">
            <div>${messageData.name}</div>
        </div>
        <div class="tinder-message-conversation">${conversationHtml}</div>
    `;
    messageBox.style.display = 'flex';
};

// Function to close the Tinder message and return to the messages list
const closeTinderMessage = () => {
    const messageBox = document.querySelector('.tinder-message-box');
    if (messageBox) {
        messageBox.style.display = 'none'; // Hide the message box
    }
};



const allApps = {
    "Instagram": { id: "instagramApp", icon: "images/app_icons/instagram.png", renderContent: renderInstagramContent, interactive: true },
    "Grindr": { id: "grindrApp", icon: "images/app_icons/grindr.png", renderContent: renderGrindrContent, interactive: true },
    "Tinder": { id: "tinderApp", icon: "images/app_icons/tinder.png", renderContent: renderTinderContent, interactive: true },
    "Messages": { id: "messagesApp", icon: "images/app_icons/messages.png", renderContent: renderMessagesContent, interactive: true },
    "Uber": { id: "uberApp", icon: "images/app_icons/uber.png", content: "Uber content", interactive: false },
    "Pinterest": { id: "pinterestApp", icon: "images/app_icons/pinterest.png", content: "Pinterest content", interactive: false },
    "Spotify": { id: "spotifyApp", icon: "images/app_icons/spotify.png", content: "Spotify content", interactive: false },
    "Netflix": { id: "netflixApp", icon: "images/app_icons/netflix.png", content: "Netflix content", interactive: false },
    "TikTok": { id: "tiktokApp", icon: "images/app_icons/tiktok.png", content: "TikTok content", interactive: false },
    "Reddit": { id: "redditApp", icon: "images/app_icons/reddit.png", content: "Reddit content", interactive: false },
    "WhatsApp": { id: "whatsappApp", icon: "images/app_icons/whatsapp.png", content: "WhatsApp content", interactive: false },
    "Discord": { id: "discordApp", icon: "images/app_icons/discord.png", content: "Discord content", interactive: false },
    "Snapchat": { id: "snapchatApp", icon: "images/app_icons/snapchat.png", content: "Snapchat content", interactive: false },
    "YouTube": { id: "youtubeApp", icon: "images/app_icons/youtube.png", content: "YouTube content", interactive: true },
    "Twitch": { id: "twitchApp", icon: "images/app_icons/twitch.png", content: "Twitch content", interactive: false },
    "LinkedIn": { id: "linkedinApp", icon: "images/app_icons/linkedin.png", content: "LinkedIn content", interactive: false },
    "Tumblr": { id: "tumblrApp", icon: "images/app_icons/tumblr.png", content: "Tumblr content", interactive: false },
    "Wattpad": { id: "wattpadApp", icon: "images/app_icons/wattpad.png", content: "Wattpad content", interactive: false }
};

const randomImage = (images) => images[Math.floor(Math.random() * images.length)];

const unlockPhoneHandler = () => {
    lockScreen.style.display = 'none';
    homeScreen.style.display = 'flex';
    phoneBackground.style.display = 'block'; // Ensure it's visible
};

const populatePhone = (character) => {
    // Load phone backgrounds and lock screens
    const phoneBackgroundImages = character.phoneBackgrounds;
    const phoneLockScreenImages = character.lockScreens;
    const characterDocks = character.dockApps;
    const characterApps = character.apps;

    phoneBackground.src = randomImage(phoneBackgroundImages);
    phoneBackground.style.display = 'block'; // Ensure it's visible
    lockScreen.style.backgroundImage = `url(${randomImage(phoneLockScreenImages)})`;
    lockScreen.style.display = 'flex';
    homeScreen.style.display = 'none';

    const updateDateTime = () => {
        const now = new Date();
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        lockDate.innerText = now.toLocaleDateString(undefined, dateOptions);
        lockTime.innerText = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    };

    updateDateTime();
    setInterval(updateDateTime, 60000);

    appGrid.innerHTML = ''; // Clear existing apps
    appDock.innerHTML = ''; // Clear existing dock apps

    // Add default apps to the grid or dock
    defaultApps.forEach(app => {
        const appEl = document.createElement('div');
        appEl.className = 'app-icon';
        appEl.id = app.id;
        appEl.setAttribute('data-app', app.name);
        appEl.innerHTML = `<img src="${app.icon}" alt="${app.name}"><div class="app-name">${app.name}</div>`;
        if (app.interactive) {
            appEl.addEventListener('click', () => {
                openApp(app, character);
            });
        } else {
            appEl.style.cursor = 'not-allowed';
        }

        if (character.dockApps.includes(app.name)) {
            appEl.innerHTML = `<img src="${app.icon}" alt="${app.name}">`;
            appDock.appendChild(appEl);
        } else {
            appGrid.appendChild(appEl);
        }
    });

    // Add character-specific apps to the grid
    if (character.apps) {
        characterApps.forEach(appName => {
            const app = allApps[appName];
            if (app) {
                const appEl = document.createElement('div');
                appEl.className = 'app-icon';
                appEl.id = app.id;
                appEl.setAttribute('data-app', appName);
                appEl.innerHTML = `<img src="${app.icon}" alt="${appName}"><div class="app-name">${appName}</div>`;
                if (app.interactive) {
                    appEl.addEventListener('click', () => {
                        openApp(app, character);
                    });
                } else {
                    appEl.style.cursor = 'not-allowed';
                }
                if (character.dockApps.includes(appName)) {
                    appEl.innerHTML = `<img src="${app.icon}" alt="${app.name}">`;
                    appDock.appendChild(appEl);
                } else {
                    appGrid.appendChild(appEl);
                }
            }
        });
    }

    // Initialize app icons after rendering them
    initializeAppIcons();

    const appDockElement = document.querySelector('.app-dock');
    const appGridElement = document.querySelector('.app-grid'); // Ensure this is defined correctly

    const extraAppsJustInCase = ["facetimeApp", "callApp", "messagesApp", "cameraApp"];

    let currentAppCount = appDockElement.children.length;


    if (currentAppCount < 4) {
        // Loop through the default apps
        extraAppsJustInCase.forEach(appId => {
            console.log("Checking for appId:", appId); // Debug: Check the current appId being processed
            
            // Check if the app is already in the dock
            if (!appDockElement.querySelector(`#${appId}`) && currentAppCount < 4) {
                const appInGrid = appGridElement.querySelector(`#${appId}`);
                const appNameElement = appInGrid.querySelector('.app-name'); // Adjust the selector as needed
                if (appNameElement) {
                    appNameElement.remove(); // Remove the name element
                }
                appDockElement.appendChild(appInGrid);
                currentAppCount++; // Increase the count
                }
        })
    }
    
    
};



const openApp = (app, character) => {
    if (app.id === "photosApp") {
        // Special handling for the Photos app
        const currentCharacter = charactersData.find(char => char.displayName === character.displayName);
        if (currentCharacter && currentCharacter.photos && currentCharacter.albums && currentCharacter.forYou && currentCharacter.search) {
            appContent.innerHTML = renderPhotosContent(currentCharacter.photos, currentCharacter.albums, currentCharacter.forYou, currentCharacter.search);
            initializeScrollListenerForForYouTab();
            addTabEventListeners();
            activateTab('photos'); // Activate the first tab by default
            appScreen.style.background = '#fff';
        } else {
            console.error('Character does not have complete photo app data:', currentCharacter);
        }
    } else if (app.renderContent) {
        if (app.id === "messageApp") {
            appScreen.style.background = '#fff';
            return
        }
        appContent.innerHTML = app.renderContent(character);
        addTabEventListeners();
        activateTab('browse'); // Activate the first tab by default
        if (app.id === "instagramApp") {
            initializeInstagramApp(character);
            appScreen.style.background = '#fff';
            
        }
        if (app.id === "tinderApp") {
            appScreen.style.background = '#fff';
        }
        if (app.id === "grindrApp") {
            appScreen.style.background = '#1f1f1f';
        }
    } else {
        // Fallback for static content apps
        appContent.innerHTML = app.content;
    }

    homeScreen.style.display = 'none';
    appScreen.style.display = 'flex';
};



unlockPhone.addEventListener('click', unlockPhoneHandler);
backToHome.addEventListener('click', () => {
    appScreen.style.display = 'none';
    homeScreen.style.display = 'flex';
});

const renderPhotosContent = (photos, albumsSections, forYou, search) => {
    // Generate album content
    const albumsContent = Object.entries(albumsSections).map(([section, albums]) => `
        <div class="album-section">
            <div class="section-title">${section}</div>
            <div class="all-albums">
                ${albums.map(album => `
                    <div class="album">
                        <img src="${album.cover}" class="album-cover">
                        <div class="album-name">${album.name}</div>
                        <div class="album-number">${album.number}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    // Generate events for "For You" tab
    const lastEvent = forYou[0];
    
    // Generate events for "For You" tab
    const forYouEvents = forYou.map(event => `
        <div class="forYou-event" data-place="${event.place}" data-date="${event.date}">
            <div class="topbar-forYou">
                <div class="topbar-inside-forYou-place">${event.place}</div>
                <div class="topbar-inside-forYou-date">${event.date}</div>
            </div>
            ${event.upper.map(photo => `<img src="${photo}" class="forYou_photo">`).join('')}
            ${event.uppermiddle.map(photo => `<img src="${photo}" class="forYou_superBigphoto">`).join('')}
            ${event.middle.map(photo => `<img src="${photo}" class="forYou_Bigphoto">`).join('')}
            ${event.down.map(photo => `<img src="${photo}" class="forYou_photo">`).join('')}
        </div>
    `).join('');

    // Return the complete HTML content
    return `
        <div class="photos-tabs">
            <div class="tab" data-tab="photos" style="background-image: url(images/app_icons/photos_nobg.png)"><p><p><span>Photos</span></p></p></div>
            <div class="tab" data-tab="albums" style="background-image: url(images/app_icons/albums-nobg.png)"><p><p><span>Albums</span></p></p></div>
            <div class="tab" data-tab="forYou" style="background-image: url(images/app_icons/foryou-nobg.png)"><p><p><span>For You</span></p></p></div>
            <div class="tab" data-tab="search" style="background-image: url(images/app_icons/search-nobg.png)"><p><p><span>Search</span></p></p></div>
        </div>
        <div class="tab-content photos active">
            <div class="topbar">
                <div class="topbar-inside">Albums</div>
                <div class="topbar-inside middle">Recents</div>
                <div class="topbar-inside">Select</div>
            </div>
            <div class="photos-here">
                ${photos.map(photo => `<img src="${photo}" class="photo shared-images">`).join('')}
            </div>
        </div>
        <div class="tab-content albums">
            ${albumsContent}
        </div>
        <div class="tab-content forYou">
            <div class="sticky-info-box" style="position: absolute; top: 20px;"> 
                <div class="info-place">${lastEvent.place}</div>
                <div class="info-date">${lastEvent.date}</div>
            </div>
            <div class="forYou-events-container">
                ${forYouEvents}
            </div>
        </div>
        <div class="tab-content search">
            <div class="topbar-search"><img src="images/app_icons/search-nobg.png"></div>
            ${search.map(person => `
                <div class="search-person">
                    <img src="${person.picture}" class="person-picture">
                    <div class="person-name">${person.name}</div>
                </div>
            `).join('')}
        </div>
        <button class="back-button" id="backToHomeFromPhotos"></button>
    `;
};


// Function to initialize scroll listener for the "For You" tab
const initializeScrollListenerForForYouTab = () => {
    const forYouContent = document.querySelector('.tab-content.forYou');

    if (forYouContent) {
        console.log('Scroll listener attached.');
        forYouContent.addEventListener('scroll', updateStickyInfoBox); // Attach the scroll listener
    } else {
        console.error('forYouContent not found.');
    }
};

// Function to update the sticky info box based on the scroll position
const updateStickyInfoBox = () => {
    const stickyInfoBox = document.querySelector('.sticky-info-box');
    const forYouEvents = document.querySelectorAll('.forYou-event');

    // Track current info in the sticky info box
    const currentPlace = stickyInfoBox.querySelector('.info-place').innerText;
    const currentDate = stickyInfoBox.querySelector('.info-date').innerText;

    let newPlace = currentPlace;
    let newDate = currentDate;

    // Find the correct event that has just passed the top of the viewport
    forYouEvents.forEach(event => {
        const rect = event.getBoundingClientRect();

        // Check if the top of the event has passed the top of the viewport
        if (rect.top < 400) {
            // Get the place and date from the event's topbar
            newPlace = event.querySelector('.topbar-inside-forYou-place').innerText;
            newDate = event.querySelector('.topbar-inside-forYou-date').innerText;
        }
    });

    // Update only if there is a change
    if (newPlace !== currentPlace || newDate !== currentDate) {
        console.log(`Updating sticky info box with: Place - ${newPlace}, Date - ${newDate}`);
        stickyInfoBox.querySelector('.info-place').innerText = newPlace;
        stickyInfoBox.querySelector('.info-date').innerText = newDate;
    }
};






const scrollToBottom = () => {
    const photosTabContent = document.querySelector('.tab-content.photos');
    photosTabContent.scrollTop = photosTabContent.scrollHeight;
};

const activateTab = (tabName) => {
    // Find the currently active tab and its corresponding content
    const currentActiveTab = document.querySelector('.tab.active');
    const newActiveTab = document.querySelector(`.tab[data-tab="${tabName}"]`);
    const newActiveContent = document.querySelector(`.tab-content.${tabName}`);

    if (!newActiveTab || !newActiveContent) {
        console.error(`Tab or content not found for tab: ${tabName}`);
        return; // Exit if the tab or content is not found
    }

    if (currentActiveTab && currentActiveTab.dataset.tab === tabName) {
        return; // Do nothing if the clicked tab is already active
    }

    // Deactivate the current tab and content
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));

    // Activate the new tab and content
    newActiveTab.classList.add('active');
    newActiveContent.classList.add('active');

    if (tabName === 'photos') {
        setTimeout(scrollToBottom, 0); // Scroll to the bottom for the Photos tab
    }

    addTabEventListeners(); // Re-attach event listeners
};


const addTabEventListeners = () => {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const tabName = e.currentTarget.getAttribute('data-tab');
            activateTab(tabName);
        });
    });
};






backToHome.addEventListener('click', () => {
    appScreen.style.display = 'none';
    homeScreen.style.display = 'flex';
});

const initializeInstagramApp = (currentCharacter, relatedCharacters) => {
    document.querySelectorAll('.instagram-tabs .tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.instagram-tabs .tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
            e.currentTarget.classList.add('active');
            document.querySelector(`.tab-content.${e.currentTarget.dataset.tab}`).classList.add('active');
        });
    });

    // Default to showing the profile tab content
    document.querySelector('.tab-content.profile').classList.add('active');

    // Event listener for profile picture stories in the profile tab
    const profilePicture = document.getElementById('profile-picture');
    if (profilePicture) {
        profilePicture.addEventListener('click', () => {
            if (currentCharacter && currentCharacter.instagram && currentCharacter.instagram.stories) {
                console.log('Displaying stories for', currentCharacter.displayName);
                showInstagramStories(currentCharacter.instagram.stories, document.querySelector('.tab-content.profile'));
            } else {
                console.error('No stories found for', currentCharacter.displayName);
            }
        });
    }

    // Event listener for memories in the profile tab
    document.querySelectorAll('.memory').forEach(memory => {
        memory.addEventListener('click', () => {
            const images = JSON.parse(memory.getAttribute('data-images'));
            console.log('Displaying memory images:', images);
            showInstagramStories(images, document.querySelector('.tab-content.profile'));
        });
    });

    // Event listener for related profiles and own profile in the activity tab
    document.querySelectorAll('.related-profile').forEach(profile => {
        profile.addEventListener('click', (e) => {
            const relatedName = e.currentTarget.getAttribute('data-name');
            const isOwnProfile = relatedName.toLowerCase() === currentCharacter.instagram.username.toLowerCase();
            const relatedCharacter = isOwnProfile ? currentCharacter : charactersData.find(char => char.displayName.toLowerCase() === relatedName.toLowerCase());

            if (relatedCharacter && relatedCharacter.instagram && relatedCharacter.instagram.stories) {
                console.log('Displaying stories for', isOwnProfile ? 'own profile' : relatedCharacter.displayName);
                showInstagramStories(relatedCharacter.instagram.stories, document.querySelector('.tab-content.activity'));
            } else {
                console.error('No stories found for', relatedCharacter ? relatedCharacter.displayName : relatedName);
            }
        });
    });
};


const showInstagramStories = (images, container) => {
    // Default to .app-content if no container is provided
    container = container || document.querySelector('.app-content');

    if (!container) {
        console.error("Container for Instagram stories not found.");
        return;
    }

    console.log('Displaying Instagram stories:', images, 'in container', container);

    let currentIndex = 0;
    const storyDuration = 3000; // Story duration in milliseconds (3 seconds)
    const incrementInterval = 50; // Interval for width increment (milliseconds)
    const storyContainer = document.createElement('div');
    storyContainer.className = 'instagram-story-container';

    const storyImage = document.createElement('img');
    storyImage.src = images[currentIndex];
    storyContainer.appendChild(storyImage);

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';

    // Create the progress segments and fillers
    images.forEach(() => {
        const progressSegment = document.createElement('div');
        progressSegment.className = 'progress-segment';

        const progressFiller = document.createElement('div');
        progressFiller.className = 'progress-filler';
        progressFiller.style.width = '0'; // Start each filler at 0 width

        progressSegment.appendChild(progressFiller);
        progressBar.appendChild(progressSegment);
    });
    storyContainer.appendChild(progressBar);

    const closeButton = document.createElement('button');
    closeButton.innerText = 'X';
    closeButton.className = 'close-story';
    closeButton.addEventListener('click', () => {
        clearInterval(interval); // Stop story interval when closed
        clearInterval(animationInterval); // Stop the animation interval
        storyContainer.remove();
    });
    storyContainer.appendChild(closeButton);

    container.appendChild(storyContainer);

    let interval, animationInterval;

    const startStory = () => {
        interval = setInterval(nextStory, storyDuration); // Story interval (3 seconds per story)
        animateSegment(); // Start animation for the current segment
    };

    const pauseStory = () => {
        clearInterval(interval);
        clearInterval(animationInterval);
    };

    const nextStory = () => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            storyImage.src = images[currentIndex];
            updateProgressBar();
            animateSegment(); // Start animation for the next segment
        } else {
            clearInterval(interval); // Stop interval after the last story
            clearInterval(animationInterval); // Stop the animation interval
            storyContainer.remove(); // Remove container after the last story
        }
    };

    const updateProgressBar = () => {
        // Reset all segment fillers
        Array.from(progressBar.children).forEach((segment, index) => {
            const filler = segment.querySelector('.progress-filler');
            filler.style.width = index < currentIndex ? '100%' : '0'; // Fill previous fillers and reset the rest
        });
    };

    const animateSegment = () => {
        const currentSegment = progressBar.children[currentIndex];
        const currentFiller = currentSegment.querySelector('.progress-filler');
        let width = 0;
        const step = (100 * incrementInterval) / storyDuration; // Calculate the step size for each interval

        // Clear any existing interval before starting a new one
        clearInterval(animationInterval);

        // Gradually increase the width of the current filler
        animationInterval = setInterval(() => {
            if (width >= 100) {
                clearInterval(animationInterval); // Stop animation when width reaches 100%
            } else {
                width += step; // Increment width by step size
                currentFiller.style.width = `${width}%`; // Update the width
            }
        }, incrementInterval);

        console.log(`Animating segment ${currentIndex} over ${storyDuration}ms`);
    };

    // Event listeners for clicking and controlling story flow
    storyImage.addEventListener('click', nextStory);
    storyImage.addEventListener('mousedown', pauseStory);
    storyImage.addEventListener('mouseup', startStory);

    updateProgressBar(); // Initialize the first segment
    startStory(); // Start the story by default
};

/* commenting the old history so it can be put back when i have more ideas
const populateHistorySection = (character) => {
    historyImages.innerHTML = ''; // Clear existing images
    historyBulletPoints.innerHTML = ''; // Clear existing bullet points

    if (character.history) {
        // Add history images
        character.history.images.forEach(imageSrc => {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.className = 'shared-images'; // Use shared class for consistency
            historyImages.appendChild(img);
        });

        // Add history bullet points
        let bulletPointsHtml = '<ul>';
        character.history.details.forEach(detail => {
            bulletPointsHtml += `<li>${detail}</li>`;
        });
        bulletPointsHtml += '</ul>';
        historyBulletPoints.innerHTML = bulletPointsHtml;
    }

    // Populate phone with character-specific information
    populatePhone(character);
};

*/

const populateHistorySection = (character) => {
    historyImages.innerHTML = ''; // Clear existing images
    historyBulletPoints.innerHTML = ''; // Clear existing bullet points
    historyExtraImages.innerHTML = '';
    themeSong.innerHTML = '';
    historyExtraBulletPoints.innerHTML = '';
    historyAtAGlance.innerHTML = '';
            
    if (character.history) {
        // Add history images
        character.history.images.forEach(imageSrc => {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.className = 'shared-images'; // Use shared class for consistency
            historyImages.appendChild(img);
        });

        if (character.history.glances) {
            for (let [title, description] of Object.entries(character.history.glances)) {
                const glanceDiv = document.createElement('div');
                glanceDiv.className = 'at-a-glance';
                
                glanceDiv.innerHTML = `<h4>${title}:</h4> ${description}`;
                
                historyAtAGlance.appendChild(glanceDiv); 
            }
        }
        
        let bulletPointsHtml = '<ul>';
        character.history.details.forEach(detail => {
            bulletPointsHtml += `<li>${detail}</li>`;
        });
        bulletPointsHtml += '</ul>';
        historyBulletPoints.innerHTML = bulletPointsHtml;

        if(character.history.extraImages){
        character.history.extraImages.forEach(imageSrc => {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.className = 'shared-images'; 
            historyExtraImages.appendChild(img);
        });
       };

       if (character.history.themeSongLyrics) {
        character.history.themeSongLyrics.forEach(songLyric => {
            const song = document.createElement('div');
            song.innerHTML = songLyric;
            song.className = 'song-idk';
            themeSong.appendChild(song); // Append to the parent element
        });
    }
    
    
       if(character.history.extraDetails){
        let extraBulletPointsHtml = '<ul>';
        character.history.extraDetails.forEach(detail => {
            extraBulletPointsHtml += `<li>${detail}</li>`;
        });
        extraBulletPointsHtml += '</ul>';
        historyExtraBulletPoints.innerHTML = extraBulletPointsHtml;
        };
    }

    // Populate phone with character-specific information
    populatePhone(character);
};


const populateNsfwSection = (character) => {
    // Select NSFW content containers
    const nsfwExtraImages = document.getElementById('nsfwExtraImages');
    const nsfwDetails = document.getElementById('nsfwDetails');
    const nsfwBulletPoints = document.getElementById('nsfwBulletPoints');

    nsfwExtraImages.innerHTML = ''; 
    nsfwDetails.innerHTML = ''; 
    nsfwBulletPoints.innerHTML = ''; 


    if (character.nsfw) {
        
        if (character.nsfw.images && character.nsfw.images.length > 0) {
            character.nsfw.images.forEach(imageSrc => {
                const img = document.createElement('img');
                img.src = imageSrc;
                img.className = 'shared-images'; 
                nsfwExtraImages.appendChild(img);
            });
        } 

        let detailsHtml = '<div><h4>Leans</h4> ';
        detailsHtml += character.nsfw.leans.join(' ╱ '); // Join with separator
        detailsHtml += '</div>';

        detailsHtml += '<div><h4>Body</h4> ';
        detailsHtml += character.nsfw.body.join(' ╱ '); // Join with separator
        detailsHtml += '</div>';

        detailsHtml += '<div><h4>Sounds</h4> ';
        detailsHtml += character.nsfw.sounds.join(' ╱ '); // Join with separator
        detailsHtml += '</div>';

        detailsHtml += '<div><h4>Inclinations</h4> ';
        detailsHtml += character.nsfw.inclinations.join(' ╱ '); // Join with separator
        detailsHtml += '</div>';

        nsfwDetails.innerHTML = detailsHtml;

        

        if (character.nsfw.bulletPoints && character.nsfw.bulletPoints.length > 0) {
            console.log('Adding NSFW bullet points:', character.nsfw.bulletPoints);
            let bulletPointsHtml = '<ul>';
            character.nsfw.bulletPoints.forEach(point => {
                bulletPointsHtml += `<li>${point}</li>`;
            });
            bulletPointsHtml += '</ul>';
            nsfwBulletPoints.innerHTML = bulletPointsHtml;
        } 
    }
};

const createConceptualMap = (character) => {
    const mapContainer = document.getElementById('mapContainer');
    mapContainer.innerHTML = ''; // Clear previous map

    // Find the first layer dynamically
    const firstLayer = Object.keys(character.mapLayers).find(layer => !isNaN(layer));
    if (firstLayer) {
        displayLayerContent(firstLayer, character.mapLayers[firstLayer], character, null);
    } else if (character.mapLayers.node) {
        showNodeLayer(character.mapLayers.node, character);
    }
};

const displayLayerContent = (currentLayer, nodes, character, parentLayerNode) => {
    const mapContainer = document.getElementById('mapContainer');
    mapContainer.innerHTML = ''; // Clear previous content

    // Display longer description and images from the parent layer node if available
    addDescriptionContainer(parentLayerNode);

    

    // Determine if there is a valid previous layer
    const currentLayerIndex = parseInt(currentLayer);
    const hasPreviousLayer = currentLayerIndex > 1 && character.mapLayers[currentLayerIndex - 1];

    // Store the current layer and nodes as the previous state for "Back One"
    previousLayer = currentLayer;
    previousNodes = nodes;
    previousParentNode = parentLayerNode; // Store the parent node for correct back navigation

    // Create cards for each location
    nodes.forEach((node) => {
        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'location-card-wrapper'; // Wrapper for relative positioning
        cardWrapper.style.position = 'relative'; // Set position to relative to contain the absolute positioning

        const locationCard = document.createElement('div');
        locationCard.className = `location-card`; // Use the same style for all levels

        const cardContent = `
            <div class="inside-location-card">
            <h3 class="node-name">${node.name}</h3>
            <p class="node-name-description">${node.type ? node.type.charAt(0).toUpperCase() + node.type.slice(1) : ''}${node.inside ? ' • ' + node.inside : ''}</p>
            <p class="description">${node.description || ''}</p>
            <div class="images-container">
                ${node.images ? node.images.map(img => `<img src="${img}" class="location-image shared-images">`).join('') : ''}
                ${node.moreImages ? node.moreImages.map(img => `<img src="${img}" class="location-image shared-images">`).join('') : ''}
            </div>
            </div>
        `;
        locationCard.innerHTML = cardContent;

        // Add the click event listener for all layers
        locationCard.addEventListener('click', () => {
            const nextLayerIndex = currentLayerIndex + 1;
            const nextLayer = character.mapLayers[nextLayerIndex];
            if (nextLayer) {
                const nextNodes = nextLayer.filter(n => n.inside === node.name);
                if (nextNodes.length > 0) {
                    displayLayerContent(nextLayerIndex.toString(), nextNodes, character, node);
                } else {
                    showWarning(); // Show warning if no further nodes
                }
            } else if (character.mapLayers.node && character.mapLayers.node.inside === node.name) {
                showNodeLayer(character.mapLayers.node, character); // Show the node layer if it exists and matches
            } else {
                showWarning(); // Show warning if no further nodes
            }
        });

        cardWrapper.appendChild(locationCard); // Append the real card to the wrapper

        mapContainer.appendChild(cardWrapper); // Add the card wrapper to map container
    });

    // Conditionally add back buttons
    if (hasPreviousLayer) {
        const backOneButton = document.createElement('button');
        backOneButton.innerText = '-';
        backOneButton.className = 'back-button-for-map';
        backOneButton.style.right = '50px';
        backOneButton.addEventListener('click', () => {
            const previousLayerIndex = currentLayerIndex - 1;
            const parentLayerNodes = character.mapLayers[previousLayerIndex];

            const parentNodeNames = [...new Set(nodes.map(node => node.inside))];
            const parentNode = parentLayerNodes.find(n => parentNodeNames.includes(n.name));
            const grandParentName = parentNode?.inside;

            const filteredNodes = parentLayerNodes.filter(n => n.inside === grandParentName);
            const grandParentNode = previousLayerIndex > 1 ? character.mapLayers[previousLayerIndex - 1].find(n => n.name === grandParentName) : null;

            displayLayerContent(previousLayerIndex.toString(), filteredNodes, character, grandParentNode);
        });
    
        mapContainer.appendChild(backOneButton);
    }
    
    const backToStartButton = document.createElement('button');
    backToStartButton.innerText = 'x';
    backToStartButton.className = 'back-button-for-map';
    backToStartButton.addEventListener('click', () => {
        createConceptualMap(character);
    });

    mapContainer.appendChild(backToStartButton);
};

const showNodeLayer = (nodeLayer, character) => {
    const mapContainer = document.getElementById('mapContainer');
    mapContainer.innerHTML = ''; // Clear the map container for the new display
    mapContainer.style.height = '300px';
    
    const imageInsideMap = document.createElement('div');
    imageInsideMap.className = 'image-inside-map-node';

    mapContainer.style.backgroundImage = `url(${nodeLayer.background})`;
    mapContainer.style.backgroundBlendMode = "luminosity";
    mapContainer.style.backgroundPosition = "center";
    mapContainer.style.backgroundSize = "cover";
    imageInsideMap.style.backgroundImage = `url(${nodeLayer.background})`;
    imageInsideMap.style.backgroundRepeat = "no-repeat";
    imageInsideMap.style.backgroundSize = 'cover';

    // Create pins for each node
    nodeLayer.pins.forEach(pin => {
        const pinElement = document.createElement('div');
        pinElement.className = 'pin';
        pinElement.style.left = `${pin.coordinates.x}%`;
        pinElement.style.top = `${pin.coordinates.y}%`;
        pinElement.title = pin.description; // Set hover text

        imageInsideMap.appendChild(pinElement);
    });

    mapContainer.appendChild(imageInsideMap);

    const commentWrapper = document.createElement('div');
    commentWrapper.className = 'comment-wrapper-node';
    
    nodeLayer.comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-inside-node';
        commentElement.innerHTML = `${comment}`;

        commentWrapper.appendChild(commentElement);
    });

    mapContainer.appendChild(commentWrapper);

    // Add back buttons
    const backOneButton = document.createElement('button');
    backOneButton.innerText = '-';
    backOneButton.className = 'back-button-for-map';
    backOneButton.style.right = '50px';
    backOneButton.addEventListener('click', () => {
        mapContainer.style = "";

        // Find the parent layer nodes
        const parentLayerNodes = character.mapLayers[previousLayer];
        console.log('Parent Layer Nodes:', parentLayerNodes);

        // Get the name of the parent node we're currently inside
        const parentNodeName = nodeLayer.inside;
        console.log('Parent Node Name:', parentNodeName);

        // Find the parent node in the previous layer
        const parentNode = parentLayerNodes.find(n => n.name === parentNodeName);
        console.log('Parent Node:', parentNode);

        // Determine the grandparent node name
        const grandParentName = parentNode ? parentNode.inside : null;
        console.log('Grandparent Name:', grandParentName);

        // Filter to show all nodes that are inside the grandparent node
        const filteredNodes = parentLayerNodes.filter(n => n.inside === grandParentName);
        console.log('Filtered Nodes:', filteredNodes);

        // Find the grandparent node for correct longer description display
        const grandParentNode = previousLayer > 1 ? character.mapLayers[previousLayer - 1].find(n => n.name === grandParentName) : null;
        console.log('Grandparent Node:', grandParentNode);

        displayLayerContent(previousLayer, filteredNodes, character, grandParentNode); 
    });

    mapContainer.appendChild(backOneButton);

    const backToStartButton = document.createElement('button');
    backToStartButton.innerText = 'x';
    backToStartButton.className = 'back-button-for-map';
    backToStartButton.addEventListener('click', () => {
        mapContainer.style = "";
        createConceptualMap(character); 
    });

    mapContainer.appendChild(backToStartButton);
};

const addDescriptionContainer = (node) => {
    if (node && node.longerDescription) {
        const mapContainer = document.getElementById('mapContainer');
        const descriptionContainer = document.createElement('div');
        descriptionContainer.className = 'description-container';

        const imagesHtml = node.images ? node.images.map(img => `<img src="${img}" class="location-image">`).join('') : '';
        const moreImagesHtml = node.moreImages ? node.moreImages.map(img => `<img src="${img}" class="location-image">`).join('') : '';
        descriptionContainer.innerHTML = `
            <div class="images-container">
                ${imagesHtml}
                ${moreImagesHtml}
            </div>
            <p class="longer-description">${node.longerDescription}</p>
        `;
        mapContainer.appendChild(descriptionContainer);
    }
};

const showWarning = () => {
    const warning = document.createElement('div');
    warning.className = 'warning-for-map';
    warning.innerText = "Nothing here yet, check back later.";
    document.body.appendChild(warning);

    // Remove the warning after a few seconds
    setTimeout(() => {
        warning.remove();
    }, 3000); // Adjust the timeout duration as needed (3000ms = 3 seconds)
};



let isReorderModeActive = false;
let dragSrcEl = null;
const elementsWithListeners = new WeakSet();
let initialOrders = {};

function addDragEventListeners(element) {
    if (!elementsWithListeners.has(element)) {
        element.addEventListener('dragstart', handleDragStart);
        element.addEventListener('dragover', handleDragOver);
        element.addEventListener('dragenter', handleDragEnter);
        element.addEventListener('dragleave', handleDragLeave);
        element.addEventListener('drop', handleDrop);
        element.addEventListener('dragend', handleDragEnd);
        elementsWithListeners.add(element);
    }
}

function removeDragEventListeners(element) {
    if (elementsWithListeners.has(element)) {
        element.removeEventListener('dragstart', handleDragStart);
        element.removeEventListener('dragover', handleDragOver);
        element.removeEventListener('dragenter', handleDragEnter);
        element.removeEventListener('dragleave', handleDragLeave);
        element.removeEventListener('drop', handleDrop);
        element.removeEventListener('dragend', handleDragEnd);
        elementsWithListeners.delete(element);
    }
}

const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
                handleNodeAdded(node);
            });
        }
    }
});

function handleNodeAdded(node) {
    if (node.nodeType !== Node.ELEMENT_NODE) return;

    if (node.classList.contains('shared-images')) {
        if (isReorderModeActive) {
            node.setAttribute('draggable', true);
            addDragEventListeners(node);
        }
    }

    const nestedSharedImages = node.querySelectorAll('.shared-images');
    nestedSharedImages.forEach((img) => {
        if (isReorderModeActive) {
            img.setAttribute('draggable', true);
            addDragEventListeners(img);
        }
    });
}

observer.observe(document.body, { childList: true, subtree: true });

function activateReorderMode() {
    isReorderModeActive = true;
    document.body.classList.add('reorder-mode-active');
    initialOrders = {};

    const images = document.querySelectorAll('.shared-images');
    images.forEach((img) => {
        img.setAttribute('draggable', true);
        addDragEventListeners(img);
    });

    storeInitialOrders();

    // Update the new order display initially
    updateNewOrderDisplay();
}

function deactivateReorderMode() {
    isReorderModeActive = false;
    document.body.classList.remove('reorder-mode-active');

    const images = document.querySelectorAll('.shared-images');
    images.forEach((img) => {
        img.removeAttribute('draggable');
        removeDragEventListeners(img);
    });

    initialOrders = {};

    // Final update of the new order display
    updateNewOrderDisplay();
}

function storeInitialOrders() {
    const images = document.querySelectorAll('.shared-images');
    const containersSet = new Set();

    images.forEach((img) => {
        containersSet.add(img.parentNode);
    });

    const containers = Array.from(containersSet);

    containers.forEach((container) => {
        let containerIdentifier = getContainerIdentifier(container);

        const imagesInContainer = container.querySelectorAll('.shared-images');
        const imageUrls = Array.from(imagesInContainer).map((img) => {
            const src = img.src;
            const index = src.indexOf('/images/');
            if (index !== -1) {
                return '.' + src.substring(index);
            } else {
                return src;
            }
        });

        initialOrders[containerIdentifier] = imageUrls;
    });
}

function updateNewOrderDisplay() {
    const images = document.querySelectorAll('.shared-images');
    const containersSet = new Set();

    images.forEach((img) => {
        containersSet.add(img.parentNode);
    });

    const containers = Array.from(containersSet);
    const newOrderPerContainer = {};

    containers.forEach((container) => {
        let containerIdentifier = getContainerIdentifier(container);

        const imagesInContainer = container.querySelectorAll('.shared-images');
        const imageUrls = Array.from(imagesInContainer).map((img) => {
            const src = img.src;
            const index = src.indexOf('/images/');
            if (index !== -1) {
                return '.' + src.substring(index);
            } else {
                return src;
            }
        });

        const initialOrder = initialOrders[containerIdentifier] || [];
        if (!arraysEqual(imageUrls, initialOrder)) {
            newOrderPerContainer[containerIdentifier] = imageUrls;
        }
    });

    const newOrderText = document.getElementById('newOrderText');
    if (newOrderText) {
        newOrderText.value = JSON.stringify(newOrderPerContainer, null, 2);
    }

    console.log('Changed Image Order:', JSON.stringify(newOrderPerContainer, null, 2));
}

function arraysEqual(a1, a2) {
    return JSON.stringify(a1) === JSON.stringify(a2);
}

function getContainerIdentifier(container) {
    if (container.id) {
        return container.id;
    } else if (container.className) {
        return container.className.split(' ')[0];
    } else {
        return 'unknownContainer';
    }
}

// Event handlers
function handleDragStart(e) {
    if (!isReorderModeActive) return;
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', null);
    this.classList.add('dragging');
}

function handleDragOver(e) {
    if (!isReorderModeActive) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    if (!isReorderModeActive) return;
    this.classList.add('over');
}

function handleDragLeave(e) {
    if (!isReorderModeActive) return;
    this.classList.remove('over');
}

function handleDrop(e) {
    if (!isReorderModeActive) return;
    e.stopPropagation();

    if (dragSrcEl !== this) {
        const dragParent = dragSrcEl.parentNode;
        const dropParent = this.parentNode;

        if (dragParent === dropParent) {
            const children = Array.from(dragParent.children);
            const dragIndex = children.indexOf(dragSrcEl);
            const dropIndex = children.indexOf(this);

            if (dragIndex < dropIndex) {
                dragParent.insertBefore(dragSrcEl, this.nextSibling);
            } else {
                dragParent.insertBefore(dragSrcEl, this);
            }
        }
    }
    return false;
}

function handleDragEnd(e) {
    if (!isReorderModeActive) return;
    this.classList.remove('dragging');
    const images = document.querySelectorAll('.shared-images');
    images.forEach((img) => img.classList.remove('over'));

    // Update order if necessary
    updateNewOrderDisplay();
}

// Event listener for the reorder mode toggle button
const toggleReorderButton = document.getElementById('toggleReorderMode');

toggleReorderButton.addEventListener('click', () => {
    isReorderModeActive = !isReorderModeActive;
    if (isReorderModeActive) {
        activateReorderMode();
    } else {
        deactivateReorderMode();
    }
});




const createCharacterElement = (character) => {
    const nsfwContainer = document.querySelector('.nsfw-container');
    const characterEl = document.createElement('div');
    characterEl.className = 'character';
    characterEl.setAttribute('data-name', character.displayName);
    characterEl.setAttribute('data-group', character.group);

    const imgEl = document.createElement('img');
    imgEl.src = randomPicture(character.pictures);
    if (character.isDead) {
        imgEl.style.filter = 'grayscale(100%)';
    }
    const nameEl = document.createElement('div');
    nameEl.innerText = character.displayName;

    characterEl.appendChild(imgEl);
    characterEl.appendChild(nameEl);

    if (character.type === 'playable') {
        characterEl.addEventListener('mouseenter', () => {
            if (toggleNpcs.checked) {
                const character = charactersData.find(char => char.displayName === characterEl.getAttribute('data-name'));
                if (character && character.connections) {
                    showNpcBubbles(characterEl, character.connections);
                }
            }
            if (toggleConnections.checked) {
                showConnections(characterEl);
            }
        });

        characterEl.addEventListener('mouseleave', () => {
            if (toggleNpcs.checked) {
                hideNpcBubbles(characterEl);
            }
            if (toggleConnections.checked) {
                hideConnections(characterEl);
            }
        });

        characterEl.addEventListener('click', () => {
            currentImages = character.fullBodyPictures || [];
            currentImageIndex = randomIndex(currentImages.length);


            carouselImages.innerHTML = ''; 
            bioExtraImages.innerHTML = ''; 

            currentImages.forEach((imageSrc) => {
                const img = document.createElement('img');
                img.src = imageSrc;
                img.style.width = '250px'; 
                img.style.height = '400px'; 
                carouselImages.appendChild(img);
            });

            const firstImgClone = carouselImages.firstElementChild.cloneNode(true);
            const lastImgClone = carouselImages.lastElementChild.cloneNode(true);
            carouselImages.appendChild(firstImgClone);
            carouselImages.insertBefore(lastImgClone, carouselImages.firstElementChild);

            carouselImages.style.width = `${(currentImages.length + 2) * 250}px`;

            updateCarousel();

            character.extraPictures.forEach(pic => {
                const img = document.createElement('img');
                img.src = pic;
                img.className = 'shared-images'; 
                bioExtraImages.appendChild(img);
            });

            let detailsHtml = '<div class="bio-details-inside">';

            for (let [title, value] of Object.entries(character.atAGlance)) {
                detailsHtml += `<div><h4>${title}:</h4> ${value}</div>`;
            }

            detailsHtml += '</div>';

            let bulletPointsHtml = '<ul>';
            character.details.forEach(detail => {
                bulletPointsHtml += `<li>${detail}</li>`;
            });
            bulletPointsHtml += '</ul>';

            let weaknessesHtml = '<h3>weaknesses</h3><p>';
            character.weaknesses.forEach(weakness => {
                weaknessesHtml += `${weakness} `;
            });

            let strengthsHtml = '<h3>strengths</h3><p>';
            character.strengths.forEach(strength => {
                strengthsHtml += `${strength}`;
            });

            bioName.innerText = character.fullName;
            bioDetails.innerHTML = detailsHtml;
            bioBulletPoints.innerHTML = bulletPointsHtml;
            bioWeaknesses.innerHTML = weaknessesHtml;
            bioStrengths.innerHTML = strengthsHtml;
            bioModal.style.display = 'block';

            const relatedPeople = charactersData
                .filter(char => char.group === character.group && char.displayName !== character.displayName)
                .map(char => char);

            const characterWindow = document.getElementById('characterWindow');
            const tabList = characterWindow.querySelector('.tab-list');
            const windowContent = characterWindow.querySelector('.window-content');

            tabList.innerHTML = '';
            windowContent.innerHTML = '';

            const tabs = [];

            if (character.searchResults && character.searchResults.length > 0) {
                const googleSearchContent = document.createElement('div');
                googleSearchContent.className = 'tab-content';
                googleSearchContent.style.display = 'none'; // Hide initially
            
                const searchBar = document.createElement('div');
                searchBar.className = 'google-search-bar';
            
                const searchBarLogo = document.createElement('img');
                searchBarLogo.src = './images/app_icons/google-logo.png';
                searchBarLogo.className = 'google-search-bar-logo';
            
                searchBar.appendChild(searchBarLogo);
            
                const searchWho = document.createElement('div');
                searchWho.className = 'google-search-bar-title';
            
                const nameSearch = document.createElement('p');
                nameSearch.innerHTML = character.displayName;
                nameSearch.className = 'google-search-bar-title-name';
            
                searchWho.appendChild(nameSearch);
                
                const rightieRight = document.createElement('div');
                rightieRight.className = 'rightie-right-idk';
            
                // Add a thin line separator
                const separator = document.createElement('div');
                separator.className = 'google-search-separator';
                rightieRight.appendChild(separator);
            
                // Create three images with specified file paths and classes
                const imageNames = ['google-speak', 'google-leans', 'google-search'];
                imageNames.forEach(name => {
                    const image = document.createElement('img');
                    image.src = `./images/app_icons/${name}.png`;
                    image.className = `same-stupid-image`;
                    rightieRight.appendChild(image); // Append each image to searchWho
                });
            
                searchWho.appendChild(rightieRight);
                searchBar.appendChild(searchWho);
                
                googleSearchContent.appendChild(searchBar);
            
                // Create the top bar if information is available
                if (character.searchTopBar) {
                    populateTopBar(googleSearchContent, character.searchTopBar);
                }
            
                const searchResultsContainer = document.createElement('div');
                searchResultsContainer.className = 'search-results-container';
            
                
            
                populateSearchResults(searchResultsContainer, character.searchResults);
                googleSearchContent.appendChild(searchResultsContainer);

                if (character.searchSidebar) {
                    const searchSidebarContainer = document.createElement('div');
                    searchSidebarContainer.className = 'search-sidebar-container';
                    populateSearchSidebar(searchSidebarContainer, character.searchSidebar, relatedPeople);
                    googleSearchContent.appendChild(searchSidebarContainer);
                }
            
                tabs.push({ name: 'Google Search', content: googleSearchContent });
            }
            
            

            tabs.forEach((tabData, index) => {
                const tab = createTab(tabData.name, tabData.content);
                tabList.appendChild(tab);
                windowContent.appendChild(tabData.content);

                if (index === 0) {
                    tab.click();
                }
            });

            characterWindow.style.display = 'block';

            createConceptualMap(character);

            if (toggleNsfw.checked == true) {
                nsfwContainer.style.display = "flex";
                populateNsfwSection(character);
            }
            if (toggleNsfw.checked == false) {
                nsfwContainer.style.display = "none";
            }

            populateHistorySection(character);
        });
    }

    return characterEl;
};


const updateCarousel = () => {
    const offset = -(currentImageIndex + 1) * 250; // Adjusted for correct width
    carouselImages.style.transition = 'transform 0.5s ease-in-out';
    carouselImages.style.transform = `translateX(${offset}px)`;
};

prevImage.addEventListener('click', () => {
    if (currentImages.length > 0) {
        currentImageIndex--;
        updateCarousel();
        setTimeout(() => {
            if (currentImageIndex < 0) {
                carouselImages.style.transition = 'none';
                currentImageIndex = currentImages.length - 1;
                const offset = -(currentImageIndex + 1) * 250; // Adjusted for correct width
                carouselImages.style.transform = `translateX(${offset}px)`;
            }
        }, 500); // Match the duration of the CSS transition
    }
});

nextImage.addEventListener('click', () => {
    if (currentImages.length > 0) {
        currentImageIndex++;
        updateCarousel();
        setTimeout(() => {
            if (currentImageIndex >= currentImages.length) {
                carouselImages.style.transition = 'none';
                currentImageIndex = 0;
                const offset = -(currentImageIndex + 1) * 250; // Adjusted for correct width
                carouselImages.style.transform = `translateX(${offset}px)`;
            }
        }, 500); // Match the duration of the CSS transition
    }
});

const renderGroups = (charactersData) => {
    groupsContainer.innerHTML = ''; // Clear existing content
    const groups = {};

    charactersData.forEach(character => {
        const group = character.group || 'default';
        if (!groups[group]) {
            groups[group] = [];
        }
        groups[group].push(character);
    });
    
    function littleWarning(){
        const warning = document.createElement('div');
        warning.className = 'warning';
        const warnigText = document.createElement('p')
        warnigText.innerText = 'So, like this is not done, nowhere near done, but if I have to wait until I am done, I will never use it, so, right now just avoid clicking on the phone because I think the website breaks if you do and then you have to refresh. (and sometimes, nothing happens! haha! so fun! coding is not hell and no one is holding me hostage in a course! why would you ask me that!)';
        warning.appendChild(warnigText)
        groupsContainer.appendChild(warning)
    }
    littleWarning();

    Object.keys(groups).forEach(groupName => {
        const groupEl = document.createElement('div');
        groupEl.className = 'group';
        const groupTitleEl = document.createElement('h3');
        groupTitleEl.innerText = groupName;
        groupEl.appendChild(groupTitleEl);

        groups[groupName].forEach(character => {
            if (character.type === 'playable') {
                const characterEl = createCharacterElement(character);
                groupEl.appendChild(characterEl);
            }
        });

        const npcsEl = document.createElement('div');
        npcsEl.className = 'npcs';
        groupEl.appendChild(npcsEl);

        groupsContainer.appendChild(groupEl);
    });
};

const showNpcBubbles = (characterEl, connections) => {
    const groupEl = characterEl.closest('.group').querySelector('.npcs');
    groupEl.innerHTML = ''; // Clear previous NPC bubbles
    connections.forEach(connection => {
        if (connection.type === 'npc') {
            const npcBubble = document.createElement('div');
            npcBubble.className = 'npc-bubble';

            const npc = charactersData.find(char => char.displayName === connection.name);
            if (npc) {
                const imgEl = document.createElement('img');
                imgEl.src = randomPicture(npc.pictures);
                if (npc.isDead) {
                    imgEl.style.filter = 'grayscale(100%)';
                }
                imgEl.style.width = '80px'; // Ensure NPC image has correct size
                imgEl.style.height = '80px'; // Ensure NPC image has correct size
                npcBubble.appendChild(imgEl);

                const npcLabel = document.createElement('div');
                npcLabel.className = 'npc-label';
                npcLabel.innerText = connection.relationship;
                npcBubble.appendChild(npcLabel);

                groupEl.appendChild(npcBubble);

                // Add the show class to trigger the transition
                setTimeout(() => {
                    npcBubble.classList.add('show');
                }, 10); // Ensure the transition triggers
            }
        }
    });
};

const hideNpcBubbles = () => {
    const npcBubbles = document.querySelectorAll('.npcs .npc-bubble');
    npcBubbles.forEach(bubble => {
        bubble.classList.remove('show'); // Remove the show class to hide the bubble
        setTimeout(() => {
            bubble.remove(); // Remove the bubble after the transition
        }, 300); // Match the duration of the CSS transition
    });
};

const showConnections = (characterEl) => {
    const characterName = characterEl.getAttribute('data-name');

    charactersData.forEach(char => {
        if (char.displayName !== characterName) {
            const targetEl = document.querySelector(`[data-name="${char.displayName}"]`);

            // Check if the target character has a connection to the hovered character
            const connection = char.connections.find(conn => conn.name === characterName);

            if (connection) {
                const connectionType = connection.type; // Use 'type' to determine highlight class and color
                const relationshipText = connection.relationship; // Use 'relationship' for label text

                if (connectionType) {
                    let highlightClass = '';
                    let borderColor = '';

                    // Determine highlight class and color based on connection type
                    switch (connectionType.toLowerCase()) { // Ensure case-insensitive comparison
                        case 'family':
                            highlightClass = 'family-highlight';
                            borderColor = 'rgb(229, 229, 247)';
                            break;
                        case 'best friend':
                            highlightClass = 'best-friend-highlight';
                            borderColor = 'rgb(222, 255, 222)';
                            break;
                        case 'love':
                            highlightClass = 'love-highlight';
                            borderColor = 'rgb(255, 192, 192)';
                            break;
                        // Add more cases as needed
                        default:
                            highlightClass = 'default-highlight';
                            borderColor = 'rgb(200, 200, 200)';
                            break;
                    }

                    // Add the highlight class to the target element
                    targetEl.classList.add(highlightClass);
                    // Tag the highlight with the source character
                    targetEl.dataset.highlightedBy = characterName;

                    // Check if a label already exists for this connection
                    let connectionLabel = targetEl.querySelector(`.connection-label[data-source-character="${characterName}"]`);

                    if (!connectionLabel) {
                        // Create a new label
                        connectionLabel = document.createElement('div');
                        connectionLabel.className = 'connection-label';
                        connectionLabel.dataset.sourceCharacter = characterName; // Tag with source character
                        connectionLabel.innerText = relationshipText; // Display the relationship
                        connectionLabel.style.borderColor = borderColor; // Set the border color
                        targetEl.appendChild(connectionLabel);
                    }
                    // Add the show class to trigger the transition
                    connectionLabel.classList.add('show');
                }
            }
        }
    });
};


const hideConnections = (characterEl) => {
    const characterName = characterEl.getAttribute('data-name');

    charactersData.forEach(char => {
        if (char.displayName !== characterName) {
            const targetEl = document.querySelector(`[data-name="${char.displayName}"]`);
            // Only remove the highlight if it was added by this character
            if (targetEl.dataset.highlightedBy === characterName) {
                targetEl.classList.remove('family-highlight', 'best-friend-highlight', 'love-highlight');
                delete targetEl.dataset.highlightedBy; // Clean up the data attribute
            }
            // Select only the labels added by this character
            const connectionLabels = targetEl.querySelectorAll(`.connection-label[data-source-character="${characterName}"]`);
            connectionLabels.forEach(label => {
                label.classList.remove('show'); // Remove the class to hide the label
                setTimeout(() => {
                    label.remove(); // Remove the label after the transition
                }, 300); // Match the duration of the CSS transition
            });
        }
    });
};


closeModal.addEventListener('click', () => {
    bioModal.style.display = 'none';
    resetPhoneScreen();
});

window.addEventListener('click', (event) => {
    if (event.target == bioModal) {
        bioModal.style.display = 'none';
        resetPhoneScreen();

    }
});

toggleNpcs.addEventListener('change', () => {
    if (toggleNpcs.checked) {
        document.querySelectorAll('.character').forEach(characterEl => {
            characterEl.addEventListener('mouseenter', showNpcBubblesHover);
            characterEl.addEventListener('mouseleave', hideNpcBubbles);
        });
    } else {
        hideNpcBubbles(); // Hide NPC bubbles immediately
        document.querySelectorAll('.character').forEach(characterEl => {
            characterEl.removeEventListener('mouseenter', showNpcBubblesHover);
            characterEl.removeEventListener('mouseleave', hideNpcBubbles);
        });
    }
});

const showNpcBubblesHover = (event) => {
    const characterEl = event.currentTarget;
    const characterName = characterEl.getAttribute('data-name');
    const character = charactersData.find(char => char.displayName === characterName);
    showNpcBubbles(characterEl, character.connections);
};

toggleConnections.addEventListener('change', () => {
    const connections = document.querySelectorAll('.connection-label');
    if (toggleConnections.checked) {
        connections.forEach(connection => connection.style.display = 'block');
    } else {
        connections.forEach(connection => connection.style.display = 'none');
    }
});

fetch('characters.json')
    .then(response => response.json())
    .then(data => {
        charactersData = data;
        renderGroups(data);
    })
    .catch(error => console.error('Error loading character data:', error));



