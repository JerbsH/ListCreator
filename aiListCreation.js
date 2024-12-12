import OpenAI from 'openai';
import { ORGANIZATION_ID, PROJECT_ID, OPENAI_API_KEY } from '@env';

const openai = new OpenAI({
  organization: ORGANIZATION_ID,
  project: PROJECT_ID,
  apiKey: OPENAI_API_KEY,
	dangerouslyAllowBrowser: true
});

export async function aiSearchSongs(songlist) {
	const completion = await openai.chat.completions.create({
		model: 'gpt-4o-mini',
		messages: [
			{ role: 'system', content: 'You are a music recommending genius' },
			{
				role: 'user',
				content: `Give me an array object of 50 similar songs to this array of songs: ${JSON.stringify(
					songlist
				)}. These songs should be included. Only give me the array as an unnamed object in plain text not in a code block.`,
			},
		],
	});
	// return completion.choices[0].message.content;
	return JSON.parse(completion.choices[0].message.content);
}
