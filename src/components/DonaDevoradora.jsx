import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import donaImg from '/assets/rosquilla-homero.png'

const MORDISCOS = [
    { ang: -35, dist: 37, size: 11 },
    { ang: 150, dist: 35, size: 12 },
    { ang: 40, dist: 31, size: 13 },
    { ang: 230, dist: 27, size: 14 },
    { ang: 95, dist: 21, size: 16 },
    { ang: 330, dist: 14, size: 20 },
].map(({ ang, dist, size }) => {
    const a = (ang * Math.PI) / 180
    const cx = 50 + Math.cos(a) * dist
    const cy = 50 + Math.sin(a) * dist
    const tx = -Math.sin(a)
    const ty = Math.cos(a)
    const circulos = [-0.75, 0, 0.75].map((o, i) => ({
        cx: cx + tx * o * size,
        cy: cy + ty * o * size,
        r: size * (i === 1 ? 1.05 : 0.85),
    }))
    return { cx, cy, circulos }
})

const COLORES_MIGAJA = ['#ff69b4', '#d64488', '#e8a951', '#c98a3d']
const COLORES_SPRINKLE = ['#e8d20f', '#e8420c', '#0fbfe8', '#8fbf12', '#ffffff']
const PALABRAS = ['¡ÑAM!', 'CHOMP', 'MMM...', '¡CRUNCH!', 'GLUP', '¡DELICIA!']

const rand = (a, b) => a + Math.random() * (b - a)
const SONIDOS = {
    comer: `${import.meta.env.BASE_URL}assets/eat-rosquilla.mp3`,
    doh: `${import.meta.env.BASE_URL}assets/homer-simpson-doh.mp3`,
}

const reproducir = (clave, { rate = 1, volume = 1 } = {}) => {
    try {
        const a = new Audio(SONIDOS[clave])
        a.playbackRate = rate
        a.volume = volume
        a.play().catch(() => { })
    } catch {

    }
}

export default function DonaDevoradora() {
    const rootRef = useRef(null)
    const shakeRef = useRef(null)
    const floatRef = useRef(null)
    const squashRef = useRef(null)
    const fxRef = useRef(null)
    const ctxRef = useRef(null)
    const ocupado = useRef(false)

    useEffect(() => {
        Object.values(SONIDOS).forEach((src) => {
            const a = new Audio(src)
            a.preload = 'auto'
            a.load()
        })
    }, [])

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(floatRef.current, {
                y: -14,
                rotation: 3,
                duration: 1.8,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
            })
        }, rootRef)
        ctxRef.current = ctx
        return () => ctx.revert()
    }, [])

    const posPx = (cx, cy) => {
        const r = rootRef.current.getBoundingClientRect()
        return { x: (cx / 100) * r.width, y: (cy / 100) * r.height, w: r.width }
    }

    const lanzarPartículas = (x, y, n, colores, { fuerza = 1, sprinkles = false } = {}) => {
        for (let i = 0; i < n; i++) {
            const el = document.createElement('div')
            const esPill = sprinkles || Math.random() > 0.6
            const w = esPill ? rand(16, 26) : rand(7, 15)
            const h = esPill ? 7 : w
            Object.assign(el.style, {
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                width: `${w}px`,
                height: `${h}px`,
                background: colores[Math.floor(Math.random() * colores.length)],
                border: '2px solid #272727',
                borderRadius: esPill ? '6px' : '50%',
                pointerEvents: 'none',
                willChange: 'transform',
            })
            fxRef.current.appendChild(el)

            const ang = rand(0, Math.PI * 2)
            const dist = rand(60, 220) * fuerza
            gsap
                .timeline({ onComplete: () => el.remove() })
                .fromTo(el, { scale: 0, rotation: rand(0, 360) }, { scale: 1, duration: 0.1 })
                .to(
                    el,
                    {
                        x: Math.cos(ang) * dist,
                        y: Math.sin(ang) * dist - rand(40, 120),
                        rotation: `+=${rand(-540, 540)}`,
                        duration: rand(0.45, 0.8),
                        ease: 'power2.out',
                    },
                    0
                )
                .to(
                    el,
                    {
                        y: `+=${rand(220, 420)}`,
                        opacity: 0,
                        duration: rand(0.6, 0.9),
                        ease: 'power2.in',
                    },
                    '>-0.05'
                )
        }
    }

    const lanzarPalabra = (texto, x, y, tam = 54) => {
        const el = document.createElement('div')
        el.textContent = texto
        Object.assign(el.style, {
            position: 'absolute',
            left: `${x}px`,
            top: `${y}px`,
            transform: 'translate(-50%, -50%)',
            fontFamily: "'Lilita One', 'Impact', 'Arial Black', sans-serif",
            fontSize: `${tam}px`,
            color: '#ffe14d',
            WebkitTextStroke: '3px #272727',
            paintOrder: 'stroke fill',
            textShadow: '4px 4px 0 #272727',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 5,
        })
        fxRef.current.appendChild(el)
        gsap
            .timeline({ onComplete: () => el.remove() })
            .fromTo(
                el,
                { scale: 0, rotation: rand(-30, 30) },
                { scale: 1, rotation: rand(-14, 14), duration: 0.45, ease: 'elastic.out(1.2, 0.4)' }
            )
            .to(el, { y: '-=70', opacity: 0, duration: 0.5, ease: 'power2.in' }, '+=0.15')
    }

    const temblor = (fuerza = 8) => {
        gsap.killTweensOf(shakeRef.current)
        gsap.fromTo(
            shakeRef.current,
            { x: 0, y: 0 },
            {
                x: () => rand(-fuerza, fuerza),
                y: () => rand(-fuerza, fuerza),
                duration: 0.04,
                repeat: 7,
                yoyo: true,
                ease: 'none',
                onComplete: () => gsap.set(shakeRef.current, { x: 0, y: 0 }),
            }
        )
    }

    const onda = (x, y, color = '#ff69b4') => {
        const el = document.createElement('div')
        Object.assign(el.style, {
            position: 'absolute',
            left: `${x}px`,
            top: `${y}px`,
            width: '120px',
            height: '120px',
            marginLeft: '-60px',
            marginTop: '-60px',
            borderRadius: '50%',
            border: `8px solid ${color}`,
            pointerEvents: 'none',
        })
        fxRef.current.appendChild(el)
        gsap.fromTo(
            el,
            { scale: 0.2, opacity: 1 },
            { scale: 5, opacity: 0, duration: 0.9, ease: 'power3.out', onComplete: () => el.remove() }
        )
    }

    const devorar = () => {
        if (ocupado.current) return
        ocupado.current = true

        ctxRef.current.add(() => {
            const root = rootRef.current
            const todosCirculos = root.querySelectorAll('[data-bite]')
            const centro = posPx(50, 50)
            const tl = gsap.timeline({
                onComplete: () => {
                    ocupado.current = false
                },
            })

            tl.to(squashRef.current, {
                scale: 1.08,
                rotation: -4,
                duration: 0.25,
                ease: 'power2.out',
            })

            MORDISCOS.forEach((m, i) => {
                const circ = root.querySelectorAll(`[data-bite="${i}"]`)
                const t = '>+0.12'

                tl.to(squashRef.current, { scale: 0.96, duration: 0.1, ease: 'power2.in' }, t)
                tl.to(
                    circ,
                    {
                        attr: { r: (idx, el) => el.dataset.r },
                        duration: 0.22,
                        ease: 'power4.out',
                        stagger: 0.035,
                        onStart: () => {
                            const p = posPx(m.cx, m.cy)
                            lanzarPartículas(p.x, p.y, 16, COLORES_MIGAJA, { fuerza: 1 + i * 0.12 })
                            lanzarPartículas(p.x, p.y, 5, COLORES_SPRINKLE, { sprinkles: true })
                            lanzarPalabra(PALABRAS[i % PALABRAS.length], p.x, p.y, 44 + i * 4)
                            temblor(5 + i * 1.5)
                            reproducir('comer', { rate: rand(0.9, 1.15) })
                        },
                    },
                    '>'
                )

                tl.fromTo(
                    squashRef.current,
                    { scaleX: 1.14, scaleY: 0.88 },
                    { scaleX: 1, scaleY: 1, duration: 0.55, ease: 'elastic.out(1, 0.35)' },
                    '<'
                )
                tl.to(
                    squashRef.current,
                    {
                        rotation: i % 2 ? 6 : -6,
                        duration: 0.18,
                        yoyo: true,
                        repeat: 1,
                        ease: 'sine.inOut',
                    },
                    '<'
                )
                tl.to(floatRef.current, { x: i % 2 ? 14 : -14, duration: 0.15, yoyo: true, repeat: 1 }, '<')
            })

            tl.to(squashRef.current, { scale: 1.2, duration: 0.25, ease: 'power2.in' }, '>+0.15')
            tl.to(
                root.querySelector('[data-bite="final"]'),
                {
                    attr: { r: 75 },
                    duration: 0.35,
                    ease: 'expo.in',
                    onStart: () => temblor(14),
                },
                '>'
            )
            tl.call(() => {
                onda(centro.x, centro.y, '#ff69b4')
                onda(centro.x, centro.y, '#e8d20f')
                lanzarPalabra('¡GLUP!', centro.x, centro.y, 96)
                reproducir('comer', { rate: 0.7, volume: 1 })
                lanzarPartículas(centro.x, centro.y, 40, COLORES_MIGAJA, { fuerza: 1.8 })
            })
            tl.to({}, { duration: 0.35 })
            tl.call(() => {
                lanzarPalabra("¡D'OH!", centro.x, centro.y + 90, 80)
                reproducir('doh')
            })

            tl.call(
                () => {
                    todosCirculos.forEach((c) => c.setAttribute('r', 0))
                },
                null,
                '>+0.5'
            )
            tl.fromTo(
                squashRef.current,
                { scale: 0, rotation: -720, opacity: 1 },
                { scale: 1, rotation: 0, duration: 1.3, ease: 'back.out(1.6)' },
                '<'
            )
            tl.call(
                () => {
                    lanzarPartículas(centro.x, centro.y, 46, COLORES_SPRINKLE, { fuerza: 2, sprinkles: true })
                    onda(centro.x, centro.y, '#0fbfe8')
                    temblor(6)
                },
                null,
                '>-0.55'
            )
        })
    }

    return (
        <div style={estilos.pagina}>
            <div ref={shakeRef} style={estilos.shake}>
                <div ref={rootRef} style={estilos.escenario}>
                    <div ref={floatRef} style={estilos.capa}>
                        <div ref={squashRef} style={estilos.capa}>
                            <svg
                                viewBox="0 0 100 100"
                                onClick={devorar}
                                style={estilos.svg}
                                role="button"
                                aria-label="Comerse la dona"
                            >
                                <defs>
                                    <mask id="mascara-mordidas" maskUnits="userSpaceOnUse" x="-20" y="-20" width="140" height="140">
                                        <rect x="-20" y="-20" width="140" height="140" fill="white" />
                                        {MORDISCOS.map((m, i) =>
                                            m.circulos.map((c, j) => (
                                                <circle
                                                    key={`${i}-${j}`}
                                                    data-bite={i}
                                                    data-r={c.r}
                                                    cx={c.cx}
                                                    cy={c.cy}
                                                    r="0"
                                                    fill="black"
                                                />
                                            ))
                                        )}
                                        <circle data-bite="final" cx="50" cy="50" r="0" fill="black" />
                                    </mask>
                                </defs>
                                <g mask="url(#mascara-mordidas)">
                                    <image href={donaImg} x="0" y="0" width="100" height="100" />
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div ref={fxRef} style={estilos.fx} />
                </div>
            </div>
        </div>
    )
}

const estilos = {
    pagina: {
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: 'transparent',
        overflow: 'hidden',
        position: 'relative',
    },
    shake: { width: 'min(80vw, 520px)', aspectRatio: '1 / 1' },
    escenario: { position: 'relative', width: '100%', height: '100%' },
    capa: { position: 'absolute', inset: 0 },
    svg: {
        width: '100%',
        height: '100%',
        overflow: 'visible',
        cursor: 'pointer',
        filter: 'drop-shadow(0 18px 0 rgba(39,39,39,0.18))',
        WebkitTapHighlightColor: 'transparent',
    },
    fx: { position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' },
}