import { Button } from './components/ui/button';
import { DiGithubBadge } from 'react-icons/di';
import { RxExternalLink } from 'react-icons/rx';
import { Separator } from './components/ui/separator';
import { Textarea } from './components/ui/textarea';

import { FaWandMagicSparkles } from 'react-icons/fa6';
import { Label } from './components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './components/ui/select';
import { Slider } from './components/ui/slider';
import { VideoInputForm } from './components/video-input-form';
import { PromptSelect } from './components/prompt-select';
import { useState } from 'react';
import { useCompletion } from 'ai/react';
import PulseLoader from 'react-spinners/PulseLoader';

export function App() {
	const [temperature, setTemperature] = useState(0.5);
	const [videoId, setVideoId] = useState<string | null>(null);

	const {
		input,
		setInput,
		handleInputChange,
		handleSubmit,
		completion,
		isLoading,
	} = useCompletion({
		api: 'http://localhost:3333/ai/complete',
		body: {
			videoId,
			temperature,
		},
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return (
		<div className='min-h-screen flex flex-col'>
			<header className='px-6 py-3 flex flex-col gap-3 md:flex-row items-center justify-between border-b sticky top-0 bg-background z-10'>
				<h1 className='text-xl font-bold'>upload.ai</h1>

				<div className='flex items-center gap-3'>
					<span className='text-xs md:text-sm text-muted-foreground'>
						Desenvolvido com 💚 por{' '}
						<a
							className='hover:underline'
							href='https://github.com/mathrb22'
							target='_blank'
							rel='noopener noreferrer'>
							@mathrb22
						</a>
					</span>

					<Separator orientation='vertical' className='h-6 hidden md:block' />
					{/* <Separator orientation='horizontal' className='w-full block md:hidden' /> */}

					<a
						href='https://github.com/mathrb22/upload-ai-web'
						target='_blank'
						rel='noopener noreferrer'>
						<Button className='flex gap-2' variant='outline' size='default'>
							<DiGithubBadge size={28} />
							<span> Github</span>
							<RxExternalLink size={16} />
						</Button>
					</a>
				</div>
			</header>

			<main className='flex flex-col gap-6 flex-1 p-6 md:flex-row'>
				<section className='flex flex-col flex-1 gap-4 '>
					<div className='grid grid-rows-2 gap-4 h-[400px] md:flex-1 md:h-auto'>
						<Textarea
							className='resize-none p-4 leading-relaxed scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent scrollbar-rounded-full
							hover:scrollbar-thumb-zinc-700
							'
							placeholder='Inclua o prompt para a IA:'
							value={input}
							onChange={handleInputChange}
						/>
						<Textarea
							className='resize-none p-4 leading-relaxed scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent scrollbar-rounded-full
							hover:scrollbar-thumb-zinc-700'
							placeholder='Resultado gerado pela IA:'
							readOnly
							value={completion}
						/>
					</div>

					<p className='text-sm text-muted-foreground'>
						Lembre-se: você pode utilizar a variável{' '}
						<code className='text-primary font-bold'>{'{transcription}'}</code> no seu
						prompt para adicionar o conteúdo da transcrição do vídeo selecionado
					</p>
				</section>

				<aside className='w-auto md:w-80 space-y-6 scroll-auto'>
					<VideoInputForm onVideoUploaded={setVideoId} />

					<Separator />

					<form onSubmit={handleSubmit} className='space-y-6'>
						<div className='space-y-2'>
							<Label>Prompt</Label>

							<PromptSelect onPromptSelected={setInput} />
						</div>

						<div className='space-y-2'>
							<Label>Modelo</Label>

							<Select disabled defaultValue='gpt3.5'>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='gpt3.5'>GPT 3.5-turbo 16k</SelectItem>
								</SelectContent>
							</Select>
							<span className='block text-xs italic text-muted-foreground'>
								Você poderá customizar esta opção em breve
							</span>
						</div>

						<Separator />

						<div className='space-y-4'>
							<div className='flex items-center justify-between'>
								<Label>Temperatura</Label>
								<span className='leading-relaxed text-muted-foreground'>
									{temperature}
								</span>
							</div>
							<Slider
								min={0}
								max={1}
								step={0.1}
								className='cursor-pointer'
								value={[temperature]}
								onValueChange={(value) => setTemperature(value[0])}
							/>

							<span className='leading-relaxed block text-xs italic text-muted-foreground'>
								Valores mais altos tendem a deixar o resultado mais criativo e com
								possíveis erros.
							</span>
						</div>

						<Separator />

						<Button
							type='submit'
							disabled={((!input || !videoId) && !isLoading) || isLoading}
							className='w-full flex items-center gap-3'>
							{isLoading ? (
								<>
									<PulseLoader color='#000' size={7} speedMultiplier={0.8} />
								</>
							) : (
								<>
									<span> Executar</span>
									<FaWandMagicSparkles size={16} />
								</>
							)}
						</Button>
					</form>
				</aside>
			</main>
		</div>
	);
}
