const profileForm = document.getElementById("profileForm");

profileForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const education = document.getElementById("education").value;
    const field = document.getElementById("field").value;

    // Convert entered skills into lowercase words
    const skillsInput = document.getElementById("skills").value
        .toLowerCase()
        .split(",")
        .map(skill => skill.trim())
        .filter(skill => skill !== "");

    let career = "";
    let description = "";
    let requiredSkills = [];
    let roadmap = [];

    // Career database
    const careers = {
        "Data Science": {
            career: "Data Scientist",
            description: "Analyze data and discover useful insights.",
            skills: [
                "python",
                "sql",
                "statistics",
                "data visualization",
                "machine learning"
            ],
            roadmap: [
                "Learn Python programming.",
                "Study statistics and probability.",
                "Practice SQL queries.",
                "Learn data visualization.",
                "Explore machine learning.",
                "Build a data science project."
            ]
        },

        "Technology": {
            career: "Web Developer",
            description: "Build and maintain websites and web applications.",
            skills: [
                "html",
                "css",
                "javascript",
                "git",
                "responsive design"
            ],
            roadmap: [
                "Learn HTML fundamentals.",
                "Practice CSS and responsive design.",
                "Learn JavaScript.",
                "Understand Git and GitHub.",
                "Build a responsive website."
            ]
        },

        "Business": {
            career: "Business Analyst",
            description: "Analyze business processes and support decisions.",
            skills: [
                "excel",
                "communication",
                "data analysis",
                "critical thinking"
            ],
            roadmap: [
                "Learn Excel.",
                "Practice data analysis.",
                "Improve communication skills.",
                "Study business fundamentals.",
                "Complete a business case study."
            ]
        },

        "Healthcare": {
            career: "Healthcare Professional",
            description: "Explore careers in healthcare and health services.",
            skills: [
                "communication",
                "scientific knowledge",
                "problem solving"
            ],
            roadmap: [
                "Explore healthcare career options.",
                "Identify the required qualifications.",
                "Study relevant subjects.",
                "Research recognized training programs."
            ]
        },

        "Design": {
            career: "UI/UX Designer",
            description: "Design useful and accessible digital experiences.",
            skills: [
                "figma",
                "wireframing",
                "prototyping",
                "user research"
            ],
            roadmap: [
                "Learn design fundamentals.",
                "Practice wireframing.",
                "Explore Figma.",
                "Create a prototype.",
                "Build a design portfolio."
            ]
        },

        "Government Jobs": {
            career: "Government Job Aspirant",
            description: "Explore government job opportunities based on your qualifications.",
            skills: [
                "reasoning",
                "quantitative aptitude",
                "general knowledge",
                "english"
            ],
            roadmap: [
                "Identify suitable government exams.",
                "Review the official syllabus.",
                "Practice reasoning and aptitude.",
                "Study general knowledge.",
                "Track official recruitment notifications."
            ]
        }
    };

    const selectedCareer = careers[field];

    career = selectedCareer.career;
    description = selectedCareer.description;
    requiredSkills = selectedCareer.skills;
    roadmap = selectedCareer.roadmap;

    // Compare entered skills with required skills
    const matchedSkills = requiredSkills.filter(skill =>
        skillsInput.includes(skill)
    );

    const missingSkills = requiredSkills.filter(skill =>
        !skillsInput.includes(skill)
    );
        // Course recommendations for each skill
    const courseResources = {
        "python": {
            title: "Python for Beginners",
            description: "Learn Python programming fundamentals.",
            link: "https://www.w3schools.com/python/"
        },
        "sql": {
            title: "SQL Tutorial",
            description: "Learn database queries and SQL fundamentals.",
            link: "https://www.w3schools.com/sql/"
        },
        "statistics": {
            title: "Statistics Fundamentals",
            description: "Learn basic statistics and probability.",
            link: "https://www.khanacademy.org/math/statistics-probability"
        },
        "data visualization": {
            title: "Data Visualization",
            description: "Learn how to represent data visually.",
            link: "https://www.freecodecamp.org/"
        },
        "machine learning": {
            title: "Machine Learning for Beginners",
            description: "Explore the fundamentals of machine learning.",
            link: "https://www.kaggle.com/learn/intro-to-machine-learning"
        },
        "html": {
            title: "HTML Tutorial",
            description: "Learn how to structure web pages.",
            link: "https://www.w3schools.com/html/"
        },
        "css": {
            title: "CSS Tutorial",
            description: "Learn how to style web pages.",
            link: "https://www.w3schools.com/css/"
        },
        "javascript": {
            title: "JavaScript Tutorial",
            description: "Learn programming for interactive websites.",
            link: "https://www.w3schools.com/js/"
        },
        "git": {
            title: "Git and GitHub",
            description: "Learn version control and collaboration.",
            link: "https://www.w3schools.com/git/"
        },
        "responsive design": {
            title: "Responsive Web Design",
            description: "Learn how to create websites for different screens.",
            link: "https://www.freecodecamp.org/learn/2022/responsive-web-design/"
        }
    };

    // Display course recommendations
    const courseList = document.getElementById("courseList");
    courseList.innerHTML = "";

    missingSkills.forEach(skill => {
        const course = courseResources[skill];

        if (course) {
            const card = document.createElement("div");
            card.className = "course-card";

            const title = document.createElement("h4");
            title.textContent = course.title;

            const description = document.createElement("p");
            description.textContent = course.description;

            const link = document.createElement("a");
            link.href = course.link;
            link.textContent = "Explore Course";
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            card.appendChild(title);
            card.appendChild(description);
            card.appendChild(link);

            courseList.appendChild(card);
        }
    });
        

        // Calculate career skill match percentage
        const matchPercentage = Math.round(
            (matchedSkills.length / requiredSkills.length) * 100
        );

        // Update progress bar
        const progressBar = document.getElementById("progressBar");
        progressBar.style.width = matchPercentage + "%";
        progressBar.textContent = matchPercentage + "%";

        document.getElementById("matchText").textContent =
            matchedSkills.length + " out of " +
            requiredSkills.length + " required skills matched.";

        // Display career information
        document.getElementById("careerTitle").textContent =
            "Hello, " + name + "! Suggested Career: " + career;

        document.getElementById("careerDescription").textContent =
            description + " Education: " + education;

        // Display matched skills
        const skillList = document.getElementById("skillList");
        skillList.innerHTML = "";

        if (matchedSkills.length === 0) {
            skillList.innerHTML = "<li>No matching skills found yet.</li>";
        } else {
            matchedSkills.forEach(skill => {
                const li = document.createElement("li");
                li.textContent = skill;
                skillList.appendChild(li);
            });
    }

    // Display missing skills
    const missingList = document.getElementById("missingList");
    missingList.innerHTML = "";

    if (missingSkills.length === 0) {
        missingList.innerHTML = "<li>You have all the listed skills!</li>";
    } else {
        missingSkills.forEach(skill => {
            const li = document.createElement("li");
            li.textContent = skill;
            missingList.appendChild(li);
        });
    }

    // Display roadmap
    const roadmapList = document.getElementById("roadmap");
    roadmapList.innerHTML = "";

    roadmap.forEach(step => {
        const li = document.createElement("li");
        li.textContent = step;
        roadmapList.appendChild(li);
    });

    document.getElementById("results").style.display = "block";

    document.getElementById("results").scrollIntoView({
        behavior: "smooth"
    });
});