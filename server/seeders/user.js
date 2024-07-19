import { Job } from "../models/job.js";
import { News } from "../models/news.js";
import { User } from "../models/user.js" 
import { faker } from "@faker-js/faker";
import { WantedList } from "../models/wantedList.js";
import { Tip } from "../models/tips.js";

const createUser = async(numUsers) => {
    try {
        const usersPromise = [];

        for(let i=0;i<numUsers;i++){
            const tempUser = User.create({
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: "devp123",
            });

            usersPromise.push(tempUser);
        }
        await Promise.all(usersPromise);
        console.log("Users Created",numUsers);
        process.exit(1);
    } catch (error) {   
        console.log(error);
        process.exit(1);
    }
}

const createJobs = async(numJobs) => {
    try {
        const jobsPromise = [];

            const temJob = Job.create(
                {
                    title: "Police Officer",
                    department: "Patrol Division",
                    location: "Los Santos",
                    description: "As a Police Officer, you will be responsible for maintaining public safety, enforcing laws, and responding to emergencies. You will work closely with the community to prevent and solve crimes. Qualifications include a high school diploma, physical fitness, and passing a background check.",
                    requirements: "High school diploma, physical fitness, background check",
                    benefits: "Health insurance, retirement plan, paid time off",
                  },
                  {
                    title: "Detective",
                    department: "Investigations Division",
                    location: "Los Santos",
                    description: "As a Detective, you will conduct investigations and solve crimes. You will gather evidence, interview witnesses, and work closely with other law enforcement agencies. Qualifications include a bachelor's degree in criminal justice, investigative experience, and excellent analytical skills.",
                    requirements: "Bachelor's degree in criminal justice, investigative experience",
                    benefits: "Health insurance, retirement plan, paid time off, flexible hours",
                  },
                  {
                    title: 'Forensic Scientist',
                    department: 'Forensics',
                    location: 'Los Santos',
                    description: 'As a Forensic Scientist, you will analyze physical evidence from crime scenes, including DNA, fingerprints, and digital evidence. You will work in a lab environment and collaborate with law enforcement to solve crimes. Qualifications include a bachelor’s degree in forensic science, biology, chemistry, or a related field, laboratory experience, and strong analytical skills.',
                    requirements: 'Bachelor’s degree in forensic science, biology, chemistry, or related field, laboratory experience, strong analytical skills.',
                    benefits: 'Health insurance, retirement plan, paid time off',
                  },
                  {
                    title: 'Administrative Assistant',
                    department: 'Administration',
                    location: 'Los Santos',
                    description: 'As an Administrative Assistant, you will provide administrative support to the police department, including record keeping, scheduling, and communication tasks. You will work closely with various departments to ensure smooth operations. Qualifications include a high school diploma or GED, proficiency in office software, and excellent organizational skills.',
                    requirements: 'High school diploma or GED, proficiency in office software, excellent organizational skills.',
                    benefits: 'Health insurance, retirement plan, paid time off',
                  },
                  {
                    title: 'Public Relations Officer',
                    department: 'Public Relations',
                    location: 'Los Santos',
                    description: 'As a Public Relations Officer, you will manage the department’s public image, handle media inquiries, and coordinate community outreach efforts. You will work with the media and the public to promote the department’s initiatives and build positive relationships. Qualifications include a bachelor’s degree in public relations, communications, or a related field, strong communication skills, and experience in media relations.',
                    requirements: 'Bachelor’s degree in public relations, communications, or related field, strong communication skills, experience in media relations.',
                    benefits: 'Health insurance, retirement plan, paid time off, flexible hours',
                  }
            );

            jobsPromise.push(temJob);
        await Promise.all(jobsPromise);
        console.log("Jobs Created",numJobs);
        process.exit(1);
    } catch (error) {   
        console.log(error);
        process.exit(1);
    }
}

const createNews = async(numNews) => {
    try {
        const newsPromise = [];

            const temNews = News.create(
                {
                    image: {
                        public_id: "a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1",
                        url: "http://res.cloudinary.com/dzawypq9r/image/upload/v1721372631/a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1.png"
                    },
                    title: 'New Community Outreach Program',
                    location: 'Washington',
                    content: 'We are excited to announce a new community outreach program to help foster better relationships between the police and the community.',
                    date: '2024-07-01T10:00',
                  },
                  {
                    image: {
                        public_id: "a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1",
                        url: "http://res.cloudinary.com/dzawypq9r/image/upload/v1721372631/a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1.png"
                    },
                    title: 'Crime Prevention Tips',
                    location: 'Washington',
                    content: 'Here are some important crime prevention tips to keep you and your family safe.',
                    date: '2024-07-01T18:00',
                  },
                  {
                    image: {
                        public_id: "a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1",
                        url: "http://res.cloudinary.com/dzawypq9r/image/upload/v1721372631/a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1.png"
                    },
                    title: 'Join the LSPD',
                    location: 'Washington',
                    content: 'We are hiring! Join the Los Santos Police Department and make a difference in your community.',
                    date: '2024-07-03T09:15',
                  },
                  {
                    image: {
                        public_id: "a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1",
                        url: "http://res.cloudinary.com/dzawypq9r/image/upload/v1721372631/a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1.png"
                    },
                    title: 'Public Safety Announcement',
                    location: 'Washington',
                    content: 'Be aware of recent scam activities in the Los Santos area. Do not share your personal information with unknown callers.',
                    date: '2024-07-04T16:00',
                  },
                  {
                    image: {
                        public_id: "a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1",
                        url: "http://res.cloudinary.com/dzawypq9r/image/upload/v1721372631/a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1.png"
                    },
                    title: 'Traffic Advisory',
                    location: 'Washington',
                    content: 'There will be road closures this weekend due to the annual marathon. Plan your travel accordingly.',
                    date: '2024-07-05T08:00',
                  },
                  {
                    image: {
                        public_id: "a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1",
                        url: "http://res.cloudinary.com/dzawypq9r/image/upload/v1721372631/a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1.png"
                    },
                    title: 'New Police Station Opening',
                    location: 'Washington',
                    content: 'We are proud to announce the opening of a new police station in the downtown area to better serve our community.',
                    date: '2024-07-06T12:45',
                  },
                  {
                    image: {
                        public_id: "a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1",
                        url: "http://res.cloudinary.com/dzawypq9r/image/upload/v1721372631/a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1.png"
                    },
                    title: 'Emergency Response Drill',
                    location: 'Washington',
                    content: 'There will be an emergency response drill this Thursday. Do not be alarmed by the increased police presence.',
                    date: '2024-07-07T11:30',
                  },
                  {
                    image: {
                        public_id: "a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1",
                        url: "http://res.cloudinary.com/dzawypq9r/image/upload/v1721372631/a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1.png"
                    },
                    title: 'Neighborhood Watch Program',
                    location: 'Washington',
                    content: 'Join your local neighborhood watch program to help keep your community safe.',
                    date: '2024-07-08T17:20',
                  },
                  {
                    image: {
                        public_id: "a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1",
                        url: "http://res.cloudinary.com/dzawypq9r/image/upload/v1721372631/a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1.png"
                    },
                    title: 'Annual Police Fundraiser',
                    location: 'Washington',
                    content: 'Support your local police department by attending our annual fundraiser. All proceeds go to community programs.',
                    date: '2024-07-09T13:40',
                  },
                  {
                    image: {
                        public_id: "a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1",
                        url: "http://res.cloudinary.com/dzawypq9r/image/upload/v1721372631/a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1.png"
                    },
                    title: 'Back to School Safety',
                    location: 'Washington',
                    content: 'As the new school year approaches, here are some safety tips for students and parents.',
                    date: '2024-07-10T07:30',
                  },
            );

            newsPromise.push(temNews);
        await Promise.all(newsPromise);
        console.log("News Created",numNews);
        process.exit(1);
    } catch (error) {   
        console.log(error);
        process.exit(1);
    }
}

const createList = async(numList) => {
    try {
        const listsPromise = [];

            const temLists = WantedList.create(
                {
                    image: {
                        public_id: "a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1",
                        url: "http://res.cloudinary.com/dzawypq9r/image/upload/v1721372631/a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1.png"
                    },
                    name: "John Doe",
                    alias: "The Phantom",
                    description: "Wanted for multiple counts of robbery and assault. Known for evading capture and using aliases.",
                    lastSeen: "Downtown Los Santos",
                    crimes: "Robbery, Assault",
                },
                  {
                    image: {
                        public_id: "a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1",
                        url: "http://res.cloudinary.com/dzawypq9r/image/upload/v1721372631/a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1.png"
                    },
                    name: "Jane Smith",
                    alias: "The Viper",
                    description: "Suspected in numerous cyber crimes and identity thefts. Expert in hacking and forgery.",
                    lastSeen: "East Vinewood",
                    crimes: "Cyber Crime, Identity Theft",
                },
                  {
                    image: {
                        public_id: "a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1",
                        url: "http://res.cloudinary.com/dzawypq9r/image/upload/v1721372631/a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1.png"
                    },
                    name: "Carlos Reyes",
                    alias: "The Snake",
                    description: "Wanted for drug trafficking and murder. Leader of a notorious gang.",
                    lastSeen: "South Los Santos",
                    crimes: "Drug Trafficking, Murder",
                },
                  {
                    image: {
                        public_id: "a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1",
                        url: "http://res.cloudinary.com/dzawypq9r/image/upload/v1721372631/a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1.png"
                    },
                    name: "Maria Lopez",
                    alias: "Black Widow",
                    description: "Suspected in several high-profile assassinations. Known to use disguises.",
                    lastSeen: "Los Santos International Airport",
                    crimes: "Assassination",
                },
                  {
                    image: {
                        public_id: "a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1",
                        url: "http://res.cloudinary.com/dzawypq9r/image/upload/v1721372631/a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1.png"
                    },
                    name: "Victor Chang",
                    alias: "The Ghost",
                    description: "Wanted for organized crime activities including extortion and racketeering.",
                    lastSeen: "Chinatown",
                    crimes: "Extortion, Racketeering",
                },
                  {
                    image: {
                        public_id: "a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1",
                        url: "http://res.cloudinary.com/dzawypq9r/image/upload/v1721372631/a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1.png"
                    },
                    name: "Nina Petrova",
                    alias: "The Siren",
                    description: "Involved in human trafficking and smuggling. Uses charm to manipulate victims.",
                    lastSeen: "Los Santos Harbor",
                    crimes: "Human Trafficking, Smuggling",
                },
                  {
                    image: {
                        public_id: "a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1",
                        url: "http://res.cloudinary.com/dzawypq9r/image/upload/v1721372631/a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1.png"
                    },
                    name: "Dmitri Ivanov",
                    alias: "The Bear",
                    description: "Wanted for armed robbery and kidnapping. Known for his brute strength.",
                    lastSeen: "North Los Santos",
                    crimes: "Armed Robbery, Kidnapping",
                },
                  {
                    image: {
                        public_id: "a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1",
                        url: "http://res.cloudinary.com/dzawypq9r/image/upload/v1721372631/a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1.png"
                    },
                    name: "Sophia Rossi",
                    alias: "The Duchess",
                    description: "Involved in art thefts and illegal trading. Sophisticated and cunning.",
                    lastSeen: "Rockford Hills",
                    crimes: "Art Theft, Illegal Trading",
                  },
                  {
                    image: {
                        public_id: "a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1",
                        url: "http://res.cloudinary.com/dzawypq9r/image/upload/v1721372631/a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1.png"
                    },
                    name: "Javier Morales",
                    alias: "The Bull",
                    description: "Wanted for gang-related violence and arms trafficking. Known for his aggressive nature.",
                    lastSeen: "El Burro Heights",
                    crimes: "Gang Violence, Arms Trafficking",
                },
                  {
                    image: {
                        public_id: "a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1",
                        url: "http://res.cloudinary.com/dzawypq9r/image/upload/v1721372631/a28af5f9-d2ca-4c46-99b4-a5c3f4ebbcf1.png"
                    },
                    name: "Emily Turner",
                    alias: "The Shadow",
                    description: "Expert thief involved in multiple high-stake heists. Master of stealth and evasion.",
                    lastSeen: "Del Perro Beach",
                    crimes: "Theft, Heists",
                }
            );

            listsPromise.push(temLists);
        await Promise.all(listsPromise);
        console.log("List Created",numList);
        process.exit(1);
    } catch (error) {   
        console.log(error);
        process.exit(1);
    }
}

const createTip = async(numTip) => {
    try {
        const tipPromise = [];
        for (let i = 0; i < numTip; i++) {
            const tip = Tip.create({
                message: faker.lorem.sentence(20),
                date: faker.date.anytime()
            });
            tipPromise.push(tip);
        }
        await Promise.all(tipPromise);
        console.log("Tips Created",numTip);
        process.exit(1);
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

export { createUser, createJobs,createNews,createList,createTip }