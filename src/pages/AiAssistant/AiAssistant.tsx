import { useState } from 'react';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { suggestNextAction } from '../../utils/aiService';
import { AnalyzeButton, AssistantInput, AssistantPanel, ExampleList, ResultBlock } from './AiAssistant.styled';

// exampleInstructions зберігає приклади команд, які AI Assistant підтримуватиме у майбутньому.
const exampleInstructions = [
  'Plan a call with the car service tomorrow at 14:00',
  'Prepare a short website offer for this client',
  'What should I do next with this lead?',
];

// Сторінка AiAssistant показує майбутню AI-архітектуру без реального OpenAI API.
export const AiAssistant = () => {
  // instruction зберігає текст користувача для аналізу.
  const [instruction, setInstruction] = useState('');
  // result зберігає placeholder-рекомендацію, створену через aiService.
  const [result, setResult] = useState(
    'Next action:\nSend a short follow-up today before 16:00.\n\nReason:\nThe client answered 2 days ago but has not received a concrete offer yet.\n\nSuggested message:\nHallo Herr Müller, ich wollte kurz nachfragen...',
  );

  // handleAnalyze імітує AI-аналіз через контрольований сервісний шар.
  const handleAnalyze = () => {
    const recommendation = suggestNextAction(instruction);
    setResult(
      `Next action:\n${recommendation.nextAction}\n\nReason:\n${recommendation.reason}\n\nSuggested message:\n${recommendation.suggestedMessage}`,
    );
  };

  return (
    <>
      <SectionTitle
        title="AI Assistant"
        description="Placeholder AI module. It will use controlled service functions and avoid unnecessary client data."
      />
      <AssistantPanel>
        <AssistantInput
          value={instruction}
          placeholder="Write an instruction for the future AI assistant..."
          onChange={(event) => setInstruction(event.target.value)}
        />
        <AnalyzeButton onClick={handleAnalyze}>Analyze</AnalyzeButton>
        <ExampleList>
          {exampleInstructions.map((example) => (
            <li key={example}>{example}</li>
          ))}
        </ExampleList>
        <ResultBlock>{result}</ResultBlock>
      </AssistantPanel>
    </>
  );
};
