# Curriculum intent

This document explains the high-level intent behind our curriculum—the motivations behind decisions and trade-offs we have made, and what we expect learners to get out of it.

## Scope

Our programme has limited time to get learners from understanding the basics to working as professional software developers in a Level 5 apprenticeship. This means we have to make strict decisions regarding what concepts to cover in the curriculum.

Software development is a hugely broad discipline, with hundreds of different programming languages and paradigms to write code within. Our curriculum is specifically focused on writing software for the (World Wide) Web. This means we exclusively use the languages native to the web—HTML, CSS and JavaScript (with a little SQL included as it is the closest thing to a standardised language for data access).

We focus on full-stack web development, which means primarily _application_ code. Our programme is designed for people who want to build web applications—this includes both client-side and server-side code. We do _not_ focus on building native applications, systems programming, hardware, or other lower-level concepts.

## Accessibility

One of Founders and Coders' founding principles is to improve access to the tech industry. Our curriculum is therefore designed to be as accessible as possible. All of the languages and technology we use and recommend are free and open source. All a learner should need to get started is access to a computer and an internet connection. Our resources are explicitly focused on people without an existing technical background, and should never require prior expertise or academic qualifications in computer science.

## Meta learning outcomes

Each topic in our curriculum has specific learning outcomes that directly relate to it. However the curriculum as a whole has some broader learning outcomes that are encourage through its structure.

### Self-sufficiency in learning

Software developers are required to constantly learn and implement new things. The job requires a strong skillset in research and self-learning. Our curriculum encourages this by not "spoon feeding" everything learners need to know. It includes dedicated research time where learners can develop these skills, and projects where they must create solutions to novel problems on their own.

### Language fluency

We expect our learners to use HTML, CSS, JS and Git fluently by the end of the course. These languages and tools should feel second nature after using them every day for months. The faster learners can become "fluent" in a programming language the sooner they can focus on higher-level concepts instead of struggling to understand the language the concepts are written in.

### Teamwork

Our programme includes very little individual work. Workshops are often completed in pairs, research is undertaken and presented in groups, and projects are completed and presented in groups. Our learners enter the workplace with a huge amount of experience in working within the roles of a modern agile software development team, which is almost an important skillset as being able to code.

## Balance

As an apprenticeship training provider it is important our curriculum meets the needs of the industry our learners end up working within. At the same time we are aware there is a tension between what might be best for a learners journey and fundamental understanding versus what is most immediately useful for a business.

We try to strike a balance between focusing on lower-level fundamental learning and higher-level abstractions like frameworks that allow junior developers to be more immediately productive at work. We believe some coding bootcamp curriculums are too focused on employability and compromise their learners' longer-term understanding for short-term employment wins. Since the majority of our learners begin our full-time programme already employed as an apprentice this is less of a concern for us.

Our policy is to teach one or two "levels of abstraction" below the industry. For example a lot of modern web development uses "meta frameworks" like Next.js, Sveltekit, Remix etc that are built on top of an existing framework like React or Svelte. Whilst our curriculum touches on meta frameworks it focuses more on the fundamentals directly below this—understanding the React framework, and the browser DOM below that.

At the same time we don't worry about students learning abstractions that are unlikely to be useful to them if they don't contribute much in extra understanding. For example we stopped implementing our own HTTP servers in raw Node.js and now use the Express framework to handle lower-level routing.
