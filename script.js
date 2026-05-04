// Aapka Diya Gaya Web App URL
const apiURL = 'https://script.google.com/macros/s/AKfycbwbzpcWmUrtLSZYaJqsip5181zVuZbVrg06dKiTidiUIHwWqZDv6zN6Yj_8iElp-WI/exec';
const projectContainer = document.getElementById('project-container');

// Fetch Projects
async function fetchProjects() {
    try {
        const response = await fetch(apiURL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const projects = await response.json();
        
        projectContainer.innerHTML = '';

        projects.forEach((project, index) => {
            if (project.Project_Name && project.Project_Name.trim() !== "") { 
                const card = document.createElement('div');
                card.className = 'project-card';
                card.setAttribute('data-aos', 'fade-up');
                card.setAttribute('data-aos-delay', (index * 100).toString());
                
                card.innerHTML = `
                    <img src="${project.Image_Link || 'https://placehold.co/600x400/0f172a/38bdf8?text=Project'}" alt="${project.Project_Name}" class="project-image">
                    <div class="project-content">
                        <span class="category-tag">${project.Category || 'Automation'}</span>
                        <h4 class="project-title">${project.Project_Name}</h4>
                        <p class="project-impact">🚀 Impact: ${project.Impact}</p>
                        <p class="project-desc">${project.Description}</p>
                        <p class="tools-used"><strong>Tools:</strong> ${project.Tools_Used}</p>
                        <a href="${project.Demo_Link}" target="_blank" class="btn btn-outline">View Project</a>
                    </div>
                `;
                projectContainer.appendChild(card);
            }
        });

    } catch (error) {
        projectContainer.innerHTML = '<p style="text-align: center; color: #ff4d4d;">Database se connect nahi ho paaya. Kripya apna Google Apps Script Deployment check karein.</p>';
        console.error('Data fetch error:', error);
    }
}

fetchProjects();

// Contact Form
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        formStatus.textContent = 'Sending message...';
        formStatus.style.color = '#38bdf8'; 

        const formData = new FormData(contactForm);

        fetch(apiURL, {
            method: 'POST',
            body: new URLSearchParams(formData)
        }).then(response => response.json())
          .then(data => {
            if(data.result === "success") {
                formStatus.textContent = 'Message sent successfully!';
                formStatus.style.color = '#2ecc71'; 
                contactForm.reset(); 
            } else {
                throw new Error('Script error');
            }
        }).catch(error => {
            formStatus.textContent = 'Oops! Error sending message.';
            formStatus.style.color = 'red'; 
        });
    });
}