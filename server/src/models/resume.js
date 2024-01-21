const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  status:String,
  address: String,
  website: String,
  linkedinProfile: String,
  githubProfile: String,
  summary: String, // Additional key for a brief professional summary
  photoURL: String, // Additional key for the URL of the resume owner's photo
  socialMedia: [
    {
      platform: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  hobbies: [
    {
      name: String,
      description: String,
      level: String, // Additional key for the level of proficiency or interest (e.g., Beginner, Intermediate, Advanced)
    },
  ],
  publications: [
    {
      title: String,
      authors: [String],
      publicationDate: Date,
      link: String,
      description: String,
      impactFactor: Number, // Additional key for the impact factor of the publication
      citationCount: Number, // Additional key for the number of citations received
    },
  ],
  conferences: [
    {
      name: String,
      role: String,
      date: Date,
      location: String,
      link: String,
      description: String,
      organizer: String, // Additional key for the organizing entity of the conference
    },
  ],
  volunteerWork: [
    {
      organization: String,
      role: String,
      startDate: Date,
      endDate: Date,
      responsibilities: [String],
      achievements: [String],
      supervisor: String, // Additional key for the name of the volunteer supervisor
    },
  ],
  awards: [
    {
      title: String,
      date: Date,
      issuer: String,
      description: String,
      recipient: String, // Additional key for the name of the award recipient
    },
  ],
  courses: [
    {
      title: String,
      institution: String,
      dateCompleted: Date,
      description: String,
      instructor: String, // Additional key for the name of the course instructor
    },
  ],
  patents: [
    {
      title: String,
      dateIssued: Date,
      description: String,
      inventors: [String], // Additional key for the inventors of the patent
    },
  ],
  memberships: [
    {
      organization: String,
      role: String,
      startDate: Date,
      endDate: Date,
      description: String,
      benefits: [String], // Additional key for listing membership benefits
    },
  ],
  education: [
    {
      institution: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldOfStudy: String,
      graduationYear: {
        type: Number,
        required: true,
      },
      honors: String,
      coursework: [String],
      projects: [
        {
          name: String,
          description: String,
          role: String,
          link: String,
        },
      ],
      thesis: {
        title: String,
        advisor: String,
        abstract: String, // Additional key for the abstract of the thesis
      },
    },
  ],
  workExperience: [
    {
      company: {
        type: String,
        required: true,
      },
      position: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: Date,
      responsibilities: [String],
      achievements: [String],
      technologiesUsed: [String],
      teamSize: Number,
      location: String,
      employmentType: String,
      isCurrentRole: Boolean,
      supervisor: String, // Additional key for the name of the immediate supervisor
      achievements: [String],
      projectsContributed: [String], // Additional key for specific projects contributed to in the role
      toolsUsed: [String], // Additional key for specific tools used in the role
    },
  ],
  skills: [
    {
      name: {
        type: String,
        required: true,
      },
      proficiency: String,
      yearsOfExperience: Number,
      endorsements: Number,
      certifications: [String], // Additional key for skill-specific certifications
      relatedCourses: [String], // Additional key for courses related to the skill
    },
  ],
  certifications: [
    {
      name: {
        type: String,
        required: true,
      },
      issuingOrganization: String,
      issueDate: Date,
      expirationDate: Date,
      certificationURL: String,
      skillsCovered: [String], // Additional key for skills covered by the certification
    },
  ],
  languages: [
    {
      name: {
        type: String,
        required: true,
      },
      proficiency: String,
      certifications: [String],
      projects: [String], // Additional key for language-specific projects
    },
  ],

  technologies: [
    {
      name: String,
      description: String, // Additional key for a brief description of the technology
      proficiency: String,
      projects: [String], // Additional key for listing projects related to the technology
    },
  ],
  frameworks: [
    {
      name: String,
      description: String,
      proficiency: String,
      projects: [String],
    },
  ],
  openSourceContributions: [
    {
      projectName: String,
      link: String,
      description: String,
    },
  ],
  research: [
    {
      title: String,
      role: String,
      startDate: Date,
      endDate: Date,
      description: String,
      link: String,
    },
  ],
  mentoring: [
    {
      organization: String,
      role: String,
      startDate: Date,
      endDate: Date,
      responsibilities: [String],
      achievements: [String],
    },
  ],
  workshops: [
    {
      title: String,
      organizer: String,
      date: Date,
      location: String,
      link: String,
      description: String,
    },
  ],
  projects: [
    {
      name: {
        type: String,
        required: true,
      },
      description: String,
      startDate: Date,
      endDate: Date,
      link: String,
      technologiesUsed: [
        {
          category: String, // Additional key for categorizing the technology
          name: String,
          description: String,
          proficiency: String,
          version: String,
          documentationLink: String,
        },
      ],
      collaborators: [
        {
          name: String,
          role: String,
          contribution: String,
          email: String,
          linkedinProfile: String,
        },
      ],
      achievements: [
        {
          title: String,
          description: String,
        },
      ],
      client: String,
      projectURL: String,
      challenges: [
        {
          description: String,
          solutions: [
            {
              description: String,
            },
          ],
        },
      ],
      responsibilities: [
        {
          description: String,
        },
      ],
      toolsUsed: [
        {
          category: String, // Additional key for categorizing the tool
          name: String,
          description: String,
          proficiency: String,
          version: String,
          documentationLink: String,
        },
      ],
      codeRepository: String,
      deploymentLink: String,
      impact: String,
      scalability: String,
      futurePlans: String,
      testing: String,
      lessonsLearned: String,
    },
  ],
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
