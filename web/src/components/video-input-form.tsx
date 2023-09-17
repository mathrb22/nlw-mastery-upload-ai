import { Label } from '@radix-ui/react-label';
import { Separator } from '@radix-ui/react-separator';
import { FiCheck, FiUpload } from 'react-icons/fi';
import { LuFileVideo, LuLoader2 } from 'react-icons/lu';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import {
	ChangeEvent,
	FormEvent,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { getFFmpeg } from '@/lib/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

export function VideoInputForm() {
	const [videoFile, setVideoFile] = useState<File | null>(null);
	const [audioConversionProgress, setAudioConversionProgress] = useState(0); // 0 - 100

	const promptInputRef = useRef<HTMLTextAreaElement>(null);

	function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
		const { files } = event.currentTarget;
		if (!files) return;

		const uploadedFile = files[0];

		setVideoFile(uploadedFile);
	}

	async function convertVideoToAudio(video: File) {
		console.log('Convertendo vídeo em áudio');

		const ffmpeg = await getFFmpeg();

		await ffmpeg.writeFile('input.mp4', await fetchFile(video));

		// ffmpeg.on('log', (log) => console.log(log));

		ffmpeg.on('progress', (progress) => {
			let conversionProgress = Math.round(progress.progress * 100);
			setAudioConversionProgress(conversionProgress);
		});

		await ffmpeg.exec([
			'-i',
			'input.mp4',
			'-map',
			'0:a',
			'-b:a',
			'40k',
			'-acodec',
			'libmp3lame',
			'output.mp3',
		]);

		const data = await ffmpeg.readFile('output.mp3');

		const audioFileBlob = new Blob([data], { type: 'audio/mpeg' });

		const audioFile = new File([audioFileBlob], 'audio.mp3', {
			type: 'audio/mpeg',
		});

		console.log('Convert finished: ' + audioFile);

		return audioFile;
	}

	async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const prompt = promptInputRef.current?.value;

		if (!videoFile) return;

		//converter o vídeo em áudio;
		const audioFile = await convertVideoToAudio(videoFile);

		console.log(audioFile, prompt);
	}

	const previewURL = useMemo(() => {
		if (!videoFile) {
			return null;
		}

		return URL.createObjectURL(videoFile);
	}, [videoFile]);

	useEffect(() => {
		let completionTimeout: NodeJS.Timeout;

		if (audioConversionProgress === 100) {
			completionTimeout = setTimeout(() => {
				setAudioConversionProgress(0); // Reset progress after 3 seconds
			}, 3000); // 3 segundos
		}

		return () => {
			clearTimeout(completionTimeout); // Limpe o timeout ao desmontar o componente
		};
	}, [audioConversionProgress]);

	return (
		<form className='space-y-6' onSubmit={handleUploadVideo}>
			<label
				htmlFor='video'
				className='relative flex flex-col gap-2 items-center justify-center w-full border cursor-pointer rounded-md aspect-video border-dashed text-sm text-muted-foreground hover:bg-primary/5 transition-colors z-auto'>
				{previewURL ? (
					<video
						src={previewURL}
						controls={false}
						className='pointer-events-none absolute inset-0 w-full h-full object-contain rounded-md'
					/>
				) : (
					<>
						<LuFileVideo size={22} />
						<span> Selecione um vídeo</span>
					</>
				)}
			</label>
			<input
				type='file'
				name='video'
				id='video'
				accept='video/mp4'
				className='sr-only'
				onChange={handleFileSelected}
			/>

			<Separator />

			<div className='space-y-2'>
				<Label htmlFor='transcription_prompt'>Prompt de transcrição</Label>
				<Textarea
					ref={promptInputRef}
					id='transcription_prompt'
					className=' h-20 p-4 resize-none leading-relaxed scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent scrollbar-rounded-full'
					placeholder='Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)'></Textarea>
			</div>

			<Button
				type='submit'
				className='w-full flex items-center gap-3'
				size='default'>
				{audioConversionProgress === 100 ? (
					<>
						<span>Conversão concluída</span>
						<FiCheck size={16} />
					</>
				) : audioConversionProgress > 0 ? (
					<>
						<>
							<LuLoader2 size={16} className='animate-spin' />
							<span>Convertendo...</span>
						</>
						<span>{audioConversionProgress}%</span>
					</>
				) : (
					<>
						<span>Carregar vídeo</span>
						<FiUpload size={16} />
					</>
				)}
			</Button>
		</form>
	);
}
