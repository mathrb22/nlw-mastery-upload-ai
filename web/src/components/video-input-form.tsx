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
import { api } from '@/lib/axios';

type Status = 'waiting' | 'converting' | 'uploading' | 'generating' | 'success';

const statusMessages = {
	converting: 'Convertendo ...',
	uploading: 'Fazendo upload...',
	generating: 'Transcrevendo...',
	success: 'Sucesso!',
};

interface VideoInputFormProps {
	onVideoUploaded: (id: string) => void;
}

export function VideoInputForm(props: VideoInputFormProps) {
	const [videoFile, setVideoFile] = useState<File | null>(null);
	const [audioConversionProgress, setAudioConversionProgress] = useState(0); // 0 - 100

	const [status, setStatus] = useState<Status>('waiting');

	const promptInputRef = useRef<HTMLTextAreaElement>(null);

	function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
		const { files } = event.currentTarget;

		if (!files || !files.length) return;

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
			console.log('Progress: ' + conversionProgress + '%');
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

		console.log('Convert finished');

		return audioFile;
	}

	async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const prompt = promptInputRef.current?.value;

		if (!videoFile) return;

		setStatus('converting');

		//converter o vídeo em áudio;
		const audioFile = await convertVideoToAudio(videoFile);

		const data = new FormData();

		data.append('file', audioFile);

		setStatus('uploading');

		const response = await api.post('/videos', data);

		const videoId = response.data.video.id;

		setStatus('generating');

		await api.post(`/videos/${videoId}/transcription`, {
			prompt,
		});

		setStatus('success');

		props.onVideoUploaded(videoId);
	}

	const previewURL = useMemo(() => {
		if (!videoFile) {
			return null;
		}

		return URL.createObjectURL(videoFile);
	}, [videoFile]);

	useEffect(() => {
		if (!videoFile) return;

		setStatus('waiting');
		// clear the promptInputRef;

		if (promptInputRef?.current) {
			promptInputRef.current.value = '';
		}
	}, [videoFile]);

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
					disabled={status !== 'waiting'}
					ref={promptInputRef}
					id='transcription_prompt'
					className=' h-20 p-4 resize-none leading-relaxed scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent scrollbar-rounded-full'
					placeholder='Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)'></Textarea>
			</div>

			<Button
				data-success={status === 'success'}
				disabled={status !== 'waiting' || !videoFile}
				type='submit'
				className='w-full flex items-center gap-3'
				size='default'>
				{status === 'waiting' ? (
					<>
						<span>Carregar vídeo</span>
						<FiUpload size={16} />
					</>
				) : (
					<>
						{status !== 'success' ? (
							<LuLoader2 size={16} className='animate-spin' />
						) : (
							<></>
						)}
						<span>{statusMessages[status]}</span>
					</>
				)}
			</Button>
		</form>
	);
}
