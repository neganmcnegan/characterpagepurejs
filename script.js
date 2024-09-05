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

const populateSearchResults = (searchResultsData) => {
    searchResults.innerHTML = '';
    searchResultsData.forEach(result => {
        const resultItem = createSearchResultItem(result.title, result.url, result.description);
        searchResults.appendChild(resultItem);
    });
};

const createSearchResultItem = (title, url, description) => {
    const item = document.createElement('div');
    item.className = 'search-result-item';

    const itemTitle = document.createElement('div');
    itemTitle.className = 'search-result-title';
    itemTitle.innerText = title;
    item.appendChild(itemTitle);

    const itemUrl = document.createElement('div');
    itemUrl.className = 'search-result-url';
    itemUrl.innerText = url;
    item.appendChild(itemUrl);

    const itemDescription = document.createElement('div');
    itemDescription.className = 'search-result-description';
    itemDescription.innerText = description;
    item.appendChild(itemDescription);

    return item;
};

const populateSearchSidebar = (sidebarInfo, relatedPeople) => {
    console.log('Sidebar Info:', sidebarInfo);
    console.log('Related People:', relatedPeople);

    searchSidebar.innerHTML = ''; // Clear previous sidebar content

    if (sidebarInfo) {
        const imagesEl = document.createElement('div');
        imagesEl.className = 'sidebar-images';

        const largeImageContainer = document.createElement('div');
        largeImageContainer.className = 'large-image-container';

        const largeImg = document.createElement('img');
        largeImg.src = sidebarInfo.images[0];
        largeImg.className = 'large-image';

        largeImageContainer.appendChild(largeImg);
        imagesEl.appendChild(largeImageContainer);

        const smallImagesContainer = document.createElement('div');
        smallImagesContainer.className = 'small-images-container';

        sidebarInfo.images.slice(1, 3).forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.className = 'small-image';
            smallImagesContainer.appendChild(img);
        });

        imagesEl.appendChild(smallImagesContainer);
        searchSidebar.appendChild(imagesEl);

        const titleEl = document.createElement('div');
        titleEl.className = 'sidebar-title';
        titleEl.innerText = sidebarInfo.title;
        searchSidebar.appendChild(titleEl);

        const subtitleEl = document.createElement('div');
        subtitleEl.className = 'sidebar-subtitle';
        subtitleEl.innerText = sidebarInfo.subtitle;
        searchSidebar.appendChild(subtitleEl);

        const aboutEl = document.createElement('div');
        aboutEl.className = 'sidebar-section';
        aboutEl.innerHTML = `<div class="sidebar-section-title">About</div><div class="sidebar-section-content">${sidebarInfo.about}</div>`;
        searchSidebar.appendChild(aboutEl);

        const birthEl = document.createElement('div');
        birthEl.className = 'sidebar-section';
        birthEl.innerHTML = `<div class="sidebar-section-content"><strong>Birth:</strong> ${sidebarInfo.birth}</div>`;
        searchSidebar.appendChild(birthEl);

        const parentsEl = document.createElement('div');
        parentsEl.className = 'sidebar-section';
        parentsEl.innerHTML = `<div class="sidebar-section-content"><strong>Parents:</strong> <span class="fake-link">${sidebarInfo.parents}</span></div>`;
        searchSidebar.appendChild(parentsEl);

        const relatedPeopleEl = document.createElement('div');
        relatedPeopleEl.className = 'sidebar-section';
        relatedPeopleEl.innerHTML = `<div class="sidebar-section-title">Related People</div>`;
        const relatedPeopleContentEl = document.createElement('div');
        relatedPeopleContentEl.className = 'related-people-carousel';

        const prevButton = document.createElement('button');
        prevButton.id = 'prevRelated';
        prevButton.className = 'carousel-button';
        prevButton.innerText = '<';

        const nextButton = document.createElement('button');
        nextButton.id = 'nextRelated';
        nextButton.className = 'carousel-button';
        nextButton.innerText = '>';

        const relatedPeopleWrapper = document.createElement('div');
        relatedPeopleWrapper.className = 'related-people-wrapper';
        relatedPeopleWrapper.style.display = 'flex';
        relatedPeopleWrapper.style.transition = 'transform 0.5s ease-in-out';

        relatedPeople.forEach(person => {
            const personEl = document.createElement('div');
            personEl.className = 'related-person';
            const personImg = document.createElement('img');
            personImg.src = randomPicture(person.pictures);
            const personName = document.createElement('div');
            personName.className = 'related-person-name';
            personName.innerText = person.displayName;
            personEl.appendChild(personImg);
            personEl.appendChild(personName);
            relatedPeopleWrapper.appendChild(personEl);
        });

        relatedPeopleContentEl.appendChild(prevButton);
        relatedPeopleContentEl.appendChild(relatedPeopleWrapper);
        relatedPeopleContentEl.appendChild(nextButton);
        relatedPeopleEl.appendChild(relatedPeopleContentEl);
        searchSidebar.appendChild(relatedPeopleEl);

        let currentIndex = 0;
        const visibleItems = 4;
        const totalItems = relatedPeople.length;
        const itemWidth = 60; // Adjust this to match the actual width of each item

        relatedPeopleWrapper.style.width = `${itemWidth * totalItems}px`;

        const updateCarousel = () => {
            const offset = -(currentIndex * itemWidth);
            relatedPeopleWrapper.style.transform = `translateX(${offset}px)`;
        };

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - visibleItems + totalItems) % totalItems;
            updateCarousel();
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + visibleItems) % totalItems;
            updateCarousel();
        });

        updateCarousel(); // Initialize carousel to the start

        // MutationObserver to handle DOM changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    updateCarousel();
                }
            });
        });

        observer.observe(relatedPeopleWrapper, { childList: true });
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
    { id: "messagesApp", name: "Messages", icon: "images/app_icons/messages.png", interactive: true },
    { id: "cameraApp", name: "Camera", icon: "images/app_icons/camera.png", interactive: true },
    { id: "photosApp", name: "Photos", icon: "images/app_icons/photos.png", interactive: true },
    { id: "mapsApp", name: "Google Maps", icon: "images/app_icons/maps.png", interactive: false },
    { id: "mailApp", name: "Mail", icon: "images/app_icons/mail.png", interactive: false },
    { id: "calendarApp", name: "Calendar", icon: "images/app_icons/calendar.png", interactive: false },
    { id: "settingsApp", name: "Settings", icon: "images/app_icons/settings.png", interactive: false }
];

function renderInstagramContent(character, relatedCharacters) {
    const instagramData = character.instagram;

    if (!instagramData || !instagramData.posts) {
        console.error('Instagram data is incomplete:', instagramData);
        return '';
    }

    console.log('Main Character Instagram Data:', instagramData);
    console.log('Related Characters:', relatedCharacters);

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

    return `
        <div class="instagram-tabs">
            <div class="tab" data-tab="activity"><img src="images/app_icons/activity.png">Activity</div>
            <div class="tab" data-tab="profile"><img src="${instagramData.profilePicture}" class="profile-picture"></div>
        </div>
        <div class="tab-content activity active">
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
                            <img src="${post.profilePicture}" class="profile-picture">
                            <div class="post-info">
                                <div class="post-author">${post.username}</div>
                                <div class="post-date" style="display:none;">${post.date}</div>
                            </div>
                        </div>
                        <img src="${post.image}" class="post-image">
                        <div class="post-footer">
                            <div class="post-likes">${post.likes} likes</div>
                            <div class="post-comments">${post.comments} comments</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="tab-content profile">
            <div class="profile-header">
                <img id="profile-picture" src="${instagramData.profilePicture}" class="profile-picture">
                <div class="profile-info">
                    <div class="profile-username">${instagramData.username}</div>
                    <div class="profile-stats">
                        <div class="profile-posts">${instagramData.posts.length} posts</div>
                        <div class="profile-followers">${instagramData.followers} followers</div>
                        <div class="profile-following">${instagramData.following} following</div>
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
};


const renderPhotosContent = (photos, albumsSections, forYou, search) => {
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

    const forYouPhotos = `
        ${forYou.upper.map(photo => `<img src="${photo}" class="forYou_photo">`).join('')}
        ${forYou.uppermiddle.map(photo => `<img src="${photo}" class="forYou_superBigphoto">`).join('')}
        ${forYou.middle.map(photo => `<img src="${photo}" class="forYou_Bigphoto">`).join('')}
        ${forYou.down.map(photo => `<img src="${photo}" class="forYou_photo">`).join('')}
    `;

    return `
        <div class="photos-tabs">
            <div class="tab" data-tab="photos" style="background-image: url(images/app_icons/photos_nobg.png)"><p><p><span>Photos<span></div>
            <div class="tab" data-tab="albums" style="background-image: url(images/app_icons/albums-nobg.png)"><p><p><span>Albums<span></div>
            <div class="tab" data-tab="forYou" style="background-image: url(images/app_icons/foryou-nobg.png)"><p><p><span>For You<span></div>
            <div class="tab" data-tab="search" style="background-image: url(images/app_icons/search-nobg.png)"><p><p><span>Search<span></div>
        </div>
        <div class="tab-content photos active">
            <div class="topbar"><div class="topbar-inside">Albums</div><div class="topbar-inside middle">Recents</div><div class="topbar-inside">Select</div></div>
            <div class="photos-here">
            ${photos.map(photo => `<img src="${photo}" class="photo">`).join('')}
            </div>
        </div>
        <div class="tab-content albums">
            ${albumsContent}
        </div>
        <div class="tab-content forYou">
            <div class="topbar-forYou">
                <div class="topbar-inside-forYou-place">${forYou.place}</div>
                <div class="topbar-inside-forYou-date">${forYou.date}</div>
            </div>
            ${forYouPhotos}
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

const activateTab = (tabName) => {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`.tab-content.${tabName}`).classList.add('active');
    document.querySelector(`.tab[data-tab="${tabName}"]`).classList.add('active');

    if (tabName === 'photos') {
        const photosTabContent = document.querySelector('.tab-content.photos');
        photosTabContent.scrollTop = photosTabContent.scrollHeight;
    }
};

const addTabEventListeners = () => {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const tabName = e.currentTarget.getAttribute('data-tab');
            activateTab(tabName);
        });
    });
};

// Ensure this function is called after rendering the photos content
addTabEventListeners();

backToHome.addEventListener('click', () => {
    appScreen.style.display = 'none';
    homeScreen.style.display = 'flex';
});

const initializeInstagramApp = (currentCharacter) => {
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

    // Event listener for profile picture stories
    const profilePicture = document.getElementById('profile-picture');
    if (profilePicture) {
        profilePicture.addEventListener('click', () => {
            if (currentCharacter && currentCharacter.instagram && currentCharacter.instagram.stories) {
                console.log('Displaying stories for', currentCharacter.displayName);
                showInstagramStories(currentCharacter.instagram.stories, document.querySelector('.tab-content.profile'));
            } else if (currentCharacter) {
                console.error('No stories found for', currentCharacter.displayName);
            } else {
                console.error('Current character not found');
            }
        });
    } else {
        console.error('Profile picture element not found');
    }

    // Event listener for memories
    document.querySelectorAll('.memory').forEach(memory => {
        memory.addEventListener('click', () => {
            const images = JSON.parse(memory.getAttribute('data-images'));
            console.log('Displaying memory images:', images);
            showInstagramStories(images, document.querySelector('.tab-content.profile'));
        });
    });

    // Event listener for related profiles in activity tab
    document.querySelectorAll('.related-profile').forEach(profile => {
        profile.addEventListener('click', (e) => {
            const relatedName = e.currentTarget.getAttribute('data-name');
            const relatedCharacter = charactersData.find(char => char.displayName === relatedName);
            if (relatedCharacter && relatedCharacter.instagram && relatedCharacter.instagram.stories) {
                console.log('Displaying stories for related profile', relatedCharacter.displayName);
                showInstagramStories(relatedCharacter.instagram.stories, document.querySelector('.tab-content.activity'));
            } else if (relatedCharacter) {
                console.error('No stories found for related profile', relatedCharacter.displayName);
            } else {
                console.error('Related character not found');
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
    const storyContainer = document.createElement('div');
    storyContainer.className = 'instagram-story-container';

    const storyImage = document.createElement('img');
    storyImage.src = images[currentIndex];
    storyContainer.appendChild(storyImage);

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    images.forEach((_, index) => {
        const progressSegment = document.createElement('div');
        progressSegment.className = 'progress-segment';
        progressBar.appendChild(progressSegment);
    });
    storyContainer.appendChild(progressBar);

    const closeButton = document.createElement('button');
    closeButton.innerText = 'X';
    closeButton.className = 'close-story';
    closeButton.addEventListener('click', () => {
        storyContainer.remove();
    });
    storyContainer.appendChild(closeButton);

    container.appendChild(storyContainer);

    let interval;
    const startStory = () => {
        interval = setInterval(nextStory, 3000);
    };

    const pauseStory = () => {
        clearInterval(interval);
    };

    const nextStory = () => {
        currentIndex++;
        if (currentIndex < images.length) {
            storyImage.src = images[currentIndex];
            updateProgressBar();
        } else {
            storyContainer.remove();
        }
    };

    const updateProgressBar = () => {
        progressBar.children[currentIndex].classList.add('active');
        progressBar.children[currentIndex].style.width = '0';
        progressBar.children[currentIndex].style.transition = 'width 3s linear';
        setTimeout(() => {
            progressBar.children[currentIndex].style.width = '100%';
        }, 10);
    };

    storyImage.addEventListener('click', nextStory);
    storyImage.addEventListener('mousedown', pauseStory);
    storyImage.addEventListener('mouseup', startStory);

    updateProgressBar();
    startStory(); // Start the story by default
};


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

const createCharacterElement = (character) => {
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

            carouselImages.innerHTML = ''; // Clear existing images
            bioExtraImages.innerHTML = ''; // Clear existing extra images

            // Add images to carousel container
            currentImages.forEach((imageSrc) => {
                const img = document.createElement('img');
                img.src = imageSrc;
                img.style.width = '250px'; // Ensure each image has the correct width
                img.style.height = '400px'; // Ensure each image has the correct height
                carouselImages.appendChild(img);
            });

            // Add duplicate first and last images for smooth transition
            const firstImgClone = carouselImages.firstElementChild.cloneNode(true);
            const lastImgClone = carouselImages.lastElementChild.cloneNode(true);
            carouselImages.appendChild(firstImgClone);
            carouselImages.insertBefore(lastImgClone, carouselImages.firstElementChild);

            // Adjust container width to fit all images including clones
            carouselImages.style.width = `${(currentImages.length + 2) * 250}px`;

            updateCarousel();

            // Add extra images
            character.extraPictures.forEach(pic => {
                const img = document.createElement('img');
                img.src = pic;
                img.className = 'shared-images'; // Use shared class for consistency
                bioExtraImages.appendChild(img);
            });

            // Add character details
            let detailsHtml = '<div class="bio-details">';
            detailsHtml += `<div>${character.age}</div>`;
            detailsHtml += `<div>${character.gender}</div>`;
            detailsHtml += `<div>${character.pronouns}</div>`;
            detailsHtml += `<div>${character.occupation}</div>`;
            detailsHtml += `<div>${character.orientation}</div>`;
            detailsHtml += `<div>${character.faceClaim}</div>`;
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

            // Populate search results
            searchInput.value = character.displayName;
            populateSearchResults(character.searchResults);

            // Get related people from the same group
            const relatedPeople = charactersData
                .filter(char => char.group === character.group && char.displayName !== character.displayName)
                .map(char => char);

            // Populate search sidebar
            populateSearchSidebar(character.searchSidebar, relatedPeople);

            // Populate the history section
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

            if (char.connections.some(conn => conn.name === characterName)) {
                const connection = char.connections.find(conn => conn.name === characterName);
                let connectionType = '';

                if (connection) {
                    connectionType = connection.relationship;
                }

                if (connectionType) {
                    let highlightClass = 'family-highlight';
                    let borderColor = 'rgb(229, 229, 247)'; // Default color for family
                    switch (connectionType) {
                        case 'best friend':
                            highlightClass = 'best-friend-highlight';
                            borderColor = 'rgb(222, 255, 222)';
                            break;
                        case 'love':
                            highlightClass = 'love-highlight';
                            borderColor = 'rgb(255, 192, 192)';
                            break;
                        // Add more cases as needed
                    }

                    targetEl.classList.add(highlightClass);
                    let connectionLabel = targetEl.querySelector('.connection-label');

                    if (!connectionLabel) {
                        connectionLabel = document.createElement('div');
                        connectionLabel.className = 'connection-label';
                        connectionLabel.innerText = connectionType;
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
            targetEl.classList.remove('family-highlight', 'best-friend-highlight', 'love-highlight');
            const connectionLabels = targetEl.querySelectorAll('.connection-label');
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
});

window.addEventListener('click', (event) => {
    if (event.target == bioModal) {
        bioModal.style.display = 'none';
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
