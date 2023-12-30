import { Card, Flex, Space, Typography } from 'antd'
import { CodeIcon, ContentIcon, EntertainmentIcon, GlobalSearchIcon, StoryIcon, ToDoIcon, TranslateIcon } from '../icons'
import { useRef } from 'react'

type Props = {
    onSelect: (prompt: string) => void
}

type PromptSampleProps = {
    title: string,
    description: string,
    icon: JSX.Element,
    onClick: () => void
}

type PromptSample = {
    id: number;
    title: string;
    description: string;
    icon: JSX.Element;
    prompts: [string, string, ...string[]];
}

const PromptSample = ({ title, description, icon, onClick }: PromptSampleProps) => (
    <Card hoverable className='prompt-example-card' onClick={onClick}>
        <Card.Meta
            title={
                <Space align='center'>
                    {icon}
                    {title}
                </Space>
            }
            description={description}
        />
    </Card>
)

const promptSamples: PromptSample[] = [
    {
        id: 0,
        title: 'Code Generation',
        description: "Generate code with explanation and examples.",
        icon: <CodeIcon size={32} />,
        prompts: [
            `Write code for a generator function in Javascript, explain in detail with examples and use cases.`,
            `Write code for a sterilizer function for HTML tags in C#, what are some good practices to be followed?`,
            `Generate typeScript interface with jsdocs for the following properties:
            \r\nduration number Duration of the reveal animation in milliseconds. Defaults to 1000 milliseconds. Optional.
            \rdelay number Delay before the start of reveal animation in milliseconds. Can be handy if several reveals are happening at approximately same time and you want to space them out a bit. Optional.
            \rleft boolean Sets the origin of the reveal animation to left. Defaults to false. Optional.
            \rright boolean Sets the origin of the reveal animation to right. Defaults to false. Optional.
            \rtop boolean Sets the origin of the reveal animation to top. Defaults to false. Optional.`
        ]
    },
    {
        id: 1,
        title: 'Content Creation',
        description: 'Create a story about a magical world or a beautiful poem that rhymes.',
        icon: <StoryIcon size={32} />,
        prompts: [
            `- Write a random short and funny poem that rhymes.\r- keep each sentence on a new line`,
            `- Write a random story, 20 paragraphs long, about a magical land, start with the origin cut to 200 years later.\r- Give the story some characters, a good climax and an awesome ending`
        ]
    },
    {
        id: 2,
        title: 'Language Translation',
        description: 'Translate a foreign language and understand their orgin and pronunciation.',
        icon: <TranslateIcon size={32} />,
        prompts: [
            `Which language is this text in 鯛も一人はうまからず and what does it mean. explain in detail`,
            `- How do I say 'Hi, Good Morning, how are you?' in French.\r- how do I pronounce it and what are some good practices while using this sentence.`
        ]
    },
    {
        id: 3,
        title: 'Text Summarization',
        description: 'Summarize contents of a paragraph in a specified format.',
        icon: <ContentIcon size={32} />,
        prompts: [
            `Summarize the content of the following paragraph, keep it short and concise while preserving the meaning of the original paragraph.
            \r follow the following format:\r\n
            <Insert Title>
            <Insert Brief Summary>
                <Insert SubTitle>
                <Insert Brief Summary>
            <Insert Examples>
            \r\nParagraph:
            Generative AI: A Paradigm Shift in Artificial Intelligence

            Generative AI, a rapidly evolving field of artificial intelligence, has the remarkable ability to create new data or content from scratch, rather than simply analyzing or processing existing data. This transformative technology holds immense potential to revolutionize various industries and aspects of our lives.
            
            Key Concepts and Techniques:
            
            Machine Learning: Generative AI models are typically trained using machine learning algorithms, which allow them to learn from and make predictions based on large datasets.
            
            Neural Networks: Generative AI often employs neural networks, particularly deep neural networks, to capture complex patterns and relationships within data.
            
            Generative Adversarial Networks (GANs): GANs are a type of generative AI model that consists of two neural networks: a generator and a discriminator. The generator creates new data or content, while the discriminator evaluates the generated data and provides feedback to the generator. This adversarial process helps the generator produce increasingly realistic and high-quality outputs.
            
            Variational Autoencoders (VAEs): VAEs are another type of generative AI model that uses a probabilistic approach to generate data. VAEs learn the underlying distribution of the data and can generate new data points that are consistent with this distribution.
            
            Applications and Impact:
            
            Art and Creativity: Generative AI has demonstrated impressive capabilities in generating various forms of art, including images, music, and text. This technology has the potential to augment human creativity and open up new avenues for artistic expression.
            
            Natural Language Processing: Generative AI models have shown remarkable progress in natural language processing tasks, such as text generation, machine translation, and dialogue systems. These models can generate human-like text, translate languages accurately, and engage in meaningful conversations.
            
            Drug Discovery and Healthcare: Generative AI has the potential to accelerate drug discovery and improve healthcare outcomes. AI models can generate new molecules with desired properties, identify potential drug targets, and analyze vast amounts of medical data to aid in diagnosis and treatment.
            
            Materials Science: Generative AI is being used to design and discover new materials with tailored properties. This technology can accelerate the development of advanced materials for applications in energy, electronics, and manufacturing.
            
            Fashion and Design: Generative AI is making waves in the fashion and design industry. AI models can generate unique and stylish clothing designs, patterns, and even entire collections. This technology has the potential to streamline the design process and bring new levels of creativity to the fashion world.
            
            Challenges and Future Directions:
            
            Bias and Fairness: Generative AI models can inherit and amplify biases present in the data they are trained on. Mitigating bias and ensuring fairness in generative AI systems is an ongoing challenge.
            
            Interpretability and Explainability: Understanding how generative AI models generate data and content can be challenging. Developing methods to interpret and explain the inner workings of these models is crucial for building trust and ensuring responsible use.
            
            Ethical Considerations: The rapid advancement of generative AI raises ethical concerns, such as the potential for misuse, deepfakes, and the impact on employment. Establishing ethical guidelines and regulations for the development and use of generative AI is essential.
            
            Generative AI is poised to transform industries and redefine the way we interact with technology. As this field continues to evolve, we can expect to witness even more groundbreaking applications and advancements that will shape the future of AI and its impact on society.
            `,
            `Summerize what the following paragraph describes in a few points, keep it brief while explaining each point, add an awesome conclusion\r\n
            Paragraph: In the tapestry of life, failure is not a full stop, but a comma, a pause that precedes a new chapter of growth and resilience. It is not a measure of our worth, but a catalyst for self-discovery and transformation. Embracing failure as a stepping stone towards success is a mindset shift that unlocks our true potential. When we learn to see setbacks as opportunities for growth, we open ourselves up to a world of possibilities. We become more resilient, more adaptable, and more determined to succeed. Failure is not something to be feared or avoided; it is an integral part of the human experience and a necessary ingredient for progress. It is in the crucible of failure that we forge our character, develop our grit, and discover our hidden strengths. By embracing failure, we unlock the door to a life of resilience, growth, and ultimately, success.
            `
        ]
    },
    {
        id: 4,
        title: 'Entertainment',
        description: 'Embark on a text based adventure or listen to some interesting jokes.',
        icon: <EntertainmentIcon size={32} />,
        prompts: [
            `Generate a new text based adventure into a magical land where I am the main character, a warrior tasked to retrieve the mystical dragon scroll, create a short start to the story, assign the main character a few stats and progress the story based on the options the user selects, follow the format:
                <insert short story progression here> what will you do?
                
                1. Option 1 (risks)
                2. Option 2 (warning)
                3. Option 3
                4. Option 4
                ...
                
                <insert number of turns remaining> for example: 0/3 turns
                - there will be a default of 3 turns, each turn can result in a win or a loss
                - if there is a win on a turn the progress the story further
                - if there is a loss, trigger a defeat and end the story example: "you lost / were defeated, would you like to try again?" if the user accepts, restart the same story from the beginning.
                - there can be a minimum of 2 options and a maximum of 5 options.
                - depending on the users option, the story will progress, each option will have a weightage that can turn the tide in favor or against the user. end the story after 4 turns, the user can either win or lose depending on the options chosen.
                - One of the options should result in an immediate loss, where the user is defeated and the story ends here, prompt the user if they wish to try again. if they choose yes, the story starts from the beginning.
                - The user can lose the game ending the story, for example if the user chooses the wrong option that does not correspond to the stats given at the start, trigger a loss saying "you lost / were defeated, would you like to try again?" if the user accepts, restart the same story from the begining.
                - The options are very difficult and will make it more and more difficult for the user to win.
                - The options will not hint what will happen should the user select that option, the aftermath will only be revealed after the user has made their choice.`,
            `Tell me a random funny and vivid joke in a story format`
        ]
    },
    {
        id: 5,
        title: 'Information Retrieval',
        description: 'Find data from the web from multiple sources.',
        icon: <GlobalSearchIcon size={32} />,
        prompts: [
            `Search the web for things I need to know to plan my next trip in the winter. explain why I need them and provide URL's to each source`,
            `Compare these two car models:\r1. Tesla Model 3\r2. Tesla Model Y\rcreate a table in markdown format for the comparison and finally draw a detailed conclusion`
        ]
    },
    {
        id: 6,
        title: 'AI Assistant',
        description: 'Brainstorm ideas for a cookie recipe or draft an email for an ad campaign.',
        icon: <ToDoIcon size={32} />,
        prompts: [
            `Compose an email for an Ad Campaign marketing an electric car called 'Invictus'`,
            `What are some good tips to follow to whip up a fresh batch of fresh yummy cookies?`
        ]
    }
]

export default function PromptSamples({ onSelect } : Props) {

    const selectedPromptRef = useRef<string>()

    return (
        <>
            <Flex wrap='wrap' gap={14} align='center' justify='center'>
                {
                    promptSamples.map((sample, sampleIndex) => (
                        <PromptSample
                            key={sample.id}
                            title={sample.title}
                            description={sample.description}
                            icon={sample.icon}
                            onClick={() => {
                                const filteredPrompts = sample.prompts.filter(s => s != selectedPromptRef.current)
                                const promptIndex = Math.floor(Math.random() * filteredPrompts.length)
                                onSelect(filteredPrompts?.[promptIndex])
                                selectedPromptRef.current = filteredPrompts?.[promptIndex]
                            }}
                        />
                    ))
                }
            </Flex>
        </>
    )
}