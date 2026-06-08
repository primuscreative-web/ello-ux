import { Heart, MapPin, MessageCircle, MoreHorizontal, Send, Star, UserRound } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FavoriteButton } from '../../components/ui/FavoriteButton'
import { isPostLiked, togglePostLike } from '../../services/localExperience'

function formatMeta(professional) {
  return [professional.city, professional.neighborhood].filter(Boolean).join(' - ') || 'Brasil'
}

export function ProfessionalPost({ liked, professional, onLike }) {
  const likedNow = liked ?? isPostLiked(professional.id)
  const ratingText = Number(professional.rating) > 0 ? professional.rating.toFixed(1) : 'Novo'
  const bio = professional.bio || 'Perfil em construcao. Toque para ver detalhes e pedir um orcamento direto.'
  const price = professional.price ? `${professional.price}${professional.chargeType ? ` / ${professional.chargeType}` : ''}` : 'Valor a combinar'

  function handleLike() {
    const nextLikes = togglePostLike(professional.id)
    onLike?.(nextLikes)
  }

  return (
    <motion.article
      variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
      className="overflow-hidden rounded-[1.7rem] border border-line bg-white shadow-soft"
    >
      <header className="flex items-center gap-3 px-4 py-3 sm:px-5">
        <Link className="flex min-w-0 flex-1 items-center gap-3" to={`/cliente/profissionais/${professional.id}`}>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/12 text-sm font-extrabold text-brandDark">
            {professional.avatar || <UserRound size={20} />}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-extrabold text-ink">{professional.name}</span>
            <span className="mt-0.5 flex items-center gap-1 text-xs font-bold text-muted">
              <MapPin size={13} className="text-brand" />
              {formatMeta(professional)}
            </span>
          </span>
        </Link>
        <FavoriteButton professionalId={professional.id} />
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition hover:bg-cloud hover:text-ink" type="button" aria-label="Mais opcoes">
          <MoreHorizontal size={20} />
        </button>
      </header>

      <Link
        className="block bg-gradient-to-br from-[#f7fff6] via-white to-[#fff8ed] px-4 py-5 sm:px-5"
        to={`/cliente/profissionais/${professional.id}`}
      >
        <div className="rounded-[1.45rem] border border-line bg-white/88 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brandDark">{professional.category}</p>
              <h2 className="mt-2 text-2xl font-extrabold leading-[1.06] tracking-[-0.04em] text-ink sm:text-3xl">
                {professional.name}
              </h2>
            </div>
            <span className="rounded-full bg-brand/10 px-3 py-2 text-xs font-extrabold text-brandDark">
              {professional.availability || 'A combinar'}
            </span>
          </div>
          <p className="mt-4 text-sm font-semibold leading-6 text-muted">{bio}</p>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <span className="rounded-2xl bg-cloud p-3">
              <span className="block text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-muted">Nota</span>
              <span className="mt-1 flex items-center gap-1 text-sm font-extrabold text-ink">
                <Star size={14} className="fill-brand text-brand" />
                {ratingText}
              </span>
            </span>
            <span className="rounded-2xl bg-cloud p-3">
              <span className="block text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-muted">Preco</span>
              <span className="mt-1 block truncate text-sm font-extrabold text-ink">{price}</span>
            </span>
            <span className="rounded-2xl bg-cloud p-3">
              <span className="block text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-muted">Resposta</span>
              <span className="mt-1 block truncate text-sm font-extrabold text-ink">{professional.responseTime}</span>
            </span>
          </div>
        </div>
      </Link>

      <footer className="grid gap-3 px-4 py-4 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            <button
              className={`flex h-11 w-11 items-center justify-center rounded-full transition ${likedNow ? 'bg-rose-50 text-rose-600' : 'text-ink hover:bg-cloud'}`}
              onClick={handleLike}
              type="button"
              aria-label={likedNow ? 'Remover curtida' : 'Curtir publicacao'}
            >
              <Heart size={22} className={likedNow ? 'fill-current' : ''} />
            </button>
            <Link className="flex h-11 w-11 items-center justify-center rounded-full text-ink transition hover:bg-cloud" to={`/cliente/orcamento/${professional.id}`} aria-label="Conversar sobre orcamento">
              <MessageCircle size={22} />
            </Link>
            <Link className="flex h-11 w-11 items-center justify-center rounded-full text-ink transition hover:bg-cloud" to={`/cliente/profissionais/${professional.id}`} aria-label="Abrir perfil">
              <Send size={21} />
            </Link>
          </div>
          <Link
            className="rounded-full bg-brand px-4 py-2.5 text-xs font-extrabold text-white shadow-[0_10px_24px_color-mix(in_srgb,var(--ello-brand)_26%,transparent)] transition hover:bg-brandDark"
            to={`/cliente/orcamento/${professional.id}`}
          >
            Pedir orcamento
          </Link>
        </div>
        <p className="text-sm font-extrabold text-ink">
          {likedNow ? 'Voce curtiu esta publicacao.' : 'Seja o primeiro a curtir esta publicacao.'}
        </p>
        <p className="text-sm font-semibold leading-6 text-muted">
          <span className="font-extrabold text-ink">{professional.name}</span> {bio}
        </p>
      </footer>
    </motion.article>
  )
}
