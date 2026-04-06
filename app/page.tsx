import { redirect } from 'next/navigation'

export default function Home() {
  // Redireciona para a página HTML estática
  redirect('/index.html')
}
