import { Button } from './components/ui/button';
import { DiGithubBadge } from 'react-icons/di';
import { RxExternalLink } from 'react-icons/rx';
import { Separator } from './components/ui/separator';
import { Textarea } from './components/ui/textarea';
import { FiUpload } from 'react-icons/fi';
import { LuFileVideo } from 'react-icons/lu';
import { Label } from './components/ui/label';

export function App() {
	return (
		<div className='min-h-screen flex flex-col'>
			<header className='px-6 py-3 flex items-center justify-between border-b'>
				<h1 className='text-xl font-bold'>upload.ai</h1>

				<div className='flex items-center gap-3'>
					<span className='text-sm text-muted-foreground'>
						Desenvolvido com 💚 por{' '}
						<a
							className='hover:underline'
							href='http://github.com/mathrb22'
							target='_blank'
							rel='noopener noreferrer'>
							@mathrb22
						</a>
					</span>

					<Separator orientation='vertical' className='h-6' />

					<a
						href='http://github.com/mathrb22'
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

			<main className='flex gap-6 flex-1 p-6'>
				<section className='flex flex-col flex-1 gap-4 scrol'>
					<div className='grid grid-rows-2 gap-4 flex-1'>
						<Textarea
							className='resize-none p-4 leading-relaxed scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent scrollbar-rounded-full
							hover:scrollbar-thumb-zinc-700
							'
							placeholder='Inclua o prompt para a IA:'
						/>
						<Textarea
							className='resize-none p-4 leading-relaxed scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent scrollbar-rounded-full
							hover:scrollbar-thumb-zinc-700'
							placeholder='Resultado gerado pela IA:'
							readOnly
						/>
					</div>

					<p className='text-sm text-muted-foreground'>
						Lembre-se: você pode utilizar a variável{' '}
						<code className='text-primary font-bold'>{'{transcription}'}</code> no seu
						prompt para adicionar o conteúdo da transcrição do vídeo selecionado
					</p>
				</section>
				<aside className='w-80 space-y-6'>
					<form className='space-y-6'>
						<label
							htmlFor='video'
							className='flex flex-col gap-2 items-center justify-center w-full border cursor-pointer rounded-md aspect-video border-dashed text-sm text-muted-foreground hover:bg-primary/5 transition-colors'>
							{/* <FiUpload size={20} /> */}
							<LuFileVideo size={22} />
							<span> Selecione um vídeo</span>
						</label>
						<input
							type='file'
							name='video'
							id='video'
							accept='video/mp4'
							className='sr-only'
						/>

						<Separator />

						<div className='space-y-1'>
							<Label htmlFor='transcription_prompt'>Prompt de transcrição</Label>
							<Textarea
								id='transcription_prompt'
								className='min-h-20 p-4 leading-relaxed scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent scrollbar-rounded-full'
								placeholder='Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)'></Textarea>
						</div>

						<Button
							type='submit'
							className='w-full flex items-center gap-3'
							size='default'>
							<span> Carregar vídeo</span>
							<FiUpload size={16} />
						</Button>
					</form>
				</aside>
			</main>
		</div>
	);
}
