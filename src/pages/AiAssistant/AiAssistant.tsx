import { useState } from 'react';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { requestAiAssistant } from '../../utils/aiService';
import { AnalyzeButton, AssistantInput, AssistantPanel, ExampleList, ResultBlock } from './AiAssistant.styled';

const exampleInstructions = [
  'Plan a call with the car service tomorrow at 14:00',
  'Prepare a short website offer for this client',
  'What should I do next with this lead?',
];

export const AiAssistant = () => {
  const [instruction, setInstruction] = useState('');
  const [result, setResult] = useState(
    'Ask the assistant what you need, for example: what should I do next with this lead?',
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    const cleanInstruction = instruction.trim();

    if (!cleanInstruction || isLoading) {
      return;
    }

    setIsLoading(true);
    setResult('Thinking...');

    try {
      const response = await requestAiAssistant(cleanInstruction);
      setResult(response.model ? `${response.answer}\n\nModel: ${response.model}` : response.answer);
    } catch (error) {
      setResult(error instanceof Error ? error.message : 'AI Assistant request failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SectionTitle
        title="AI Assistant"
        description="Ask for next actions, short drafts, and CRM-focused business help."
      />
      <AssistantPanel>
        <AssistantInput
          value={instruction}
          placeholder="Write an instruction for the AI assistant..."
          onChange={(event) => setInstruction(event.target.value)}
        />
        <AnalyzeButton onClick={handleAnalyze} disabled={isLoading || !instruction.trim()}>
          {isLoading ? 'Analyzing...' : 'Analyze'}
        </AnalyzeButton>
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
