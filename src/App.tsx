import { Button } from './components/ui/button';
import { DiGithubBadge } from 'react-icons/di';
import { RxExternalLink } from 'react-icons/rx';
import { Separator } from './components/ui/separator';
import { Textarea } from './components/ui/textarea';
import { FiUpload } from 'react-icons/fi';
import { LuFileVideo } from 'react-icons/lu';
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

export function App() {
	return (
		<div className='min-h-screen flex flex-col'>
			<header className='px-6 py-3 flex flex-col gap-3 md:flex-row items-center justify-between border-b sticky top-0 bg-background'>
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
				<aside className='w-auto md:w-80 space-y-6 scroll-auto'>
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

						<div className='space-y-2'>
							<Label htmlFor='transcription_prompt'>Prompt de transcrição</Label>
							<Textarea
								id='transcription_prompt'
								className=' h-20 p-4 resize-none leading-relaxed scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent scrollbar-rounded-full'
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

					<Separator />

					<form className='space-y-6'>
						<div className='space-y-2'>
							<Label>Prompt</Label>

							<Select>
								<SelectTrigger>
									<SelectValue placeholder='Selecione um prompt' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='title'>Título do YouTube</SelectItem>
									<SelectItem value='description'>Descrição do YouTube</SelectItem>
								</SelectContent>
							</Select>
							<span className='block text-xs italic text-muted-foreground'>
								Você poderá customizar esta opção em breve
							</span>
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
							<Label>Temperatura</Label>

							<Slider min={0} max={1} step={0.1} className='cursor-pointer' />

							<span className='leading-relaxed block text-xs italic text-muted-foreground'>
								Valores mais altos tendem a deixar o resultado mais criativo e com
								possíveis erros.
							</span>
						</div>

						<Separator />

						<Button type='submit' className='w-full flex items-center gap-3'>
							<span> Executar</span>

							<FaWandMagicSparkles size={16} />
						</Button>
					</form>
				</aside>
			</main>
		</div>
	);
}
