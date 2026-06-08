"use client"

import { useState, useEffect } from "react"
// Use internal utility or shared if available. 
// Since lib/utils doesn't exist yet, we'll inline cn here or create it.
// Given previous steps, I'll inline it for reliability.
function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(" ");
}

const testimonials = [
    {
        id: 1,
        quote: "My WooCommerce orders ship the same day I drop them off — my customers receive their skincare in 24 hours, every single time.",
        author: "Noura Al-Harbi",
        role: "Founder, Glow Atelier",
        avatar: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=480&auto=format&fit=crop",
    },
    {
        id: 2,
        quote: "I send product samples to my factories in China every week. WhiteBox handles the customs paperwork and they always land on schedule.",
        author: "Khalid Al-Otaibi",
        role: "Sourcing Manager, Riyadh",
        avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=480&auto=format&fit=crop",
    },
    {
        id: 3,
        quote: "Glass bottles, makeup, gift boxes — everything arrives exactly how I packed it. My customers notice the difference.",
        author: "Reem Al-Dossary",
        role: "Owner, Layan Boutique",
        avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=480&auto=format&fit=crop",
    },
    {
        id: 4,
        quote: "Shipped my excess luggage to Riyadh before a family trip — it arrived before I did, untouched. That's the only proof I needed.",
        author: "Faisal Al-Qahtani",
        role: "Frequent Traveler",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=480&auto=format&fit=crop",
    },
]

export function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [displayedQuote, setDisplayedQuote] = useState(testimonials[0].quote)
    const [displayedRole, setDisplayedRole] = useState(testimonials[0].role)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const handleSelect = (index: number) => {
        if (index === activeIndex || isAnimating) return
        setIsAnimating(true)

        setTimeout(() => {
            setDisplayedQuote(testimonials[index].quote)
            setDisplayedRole(testimonials[index].role)
            setActiveIndex(index)
            setTimeout(() => setIsAnimating(false), 400)
        }, 200)
    }

    // Auto-rotate every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            const nextIndex = (activeIndex + 1) % testimonials.length
            handleSelect(nextIndex)
        }, 5000)

        return () => clearInterval(timer)
    }, [activeIndex])

    return (
        <div className="flex flex-col items-center gap-6 py-8">
            {/* Tiny editorial index — anchors the rotation, hints at depth */}
            <div className="flex items-center gap-2 text-[0.6rem] font-bold font-exo uppercase tracking-[0.28em] text-charcoal/35 num-tabular">
                <span>{String(activeIndex + 1).padStart(2, "0")}</span>
                <span className="block h-px w-6 bg-charcoal/20" />
                <span>{String(testimonials.length).padStart(2, "0")}</span>
            </div>

            {/* Quote Container */}
            <div className="relative px-8">
                <span className="absolute -left-2 -top-6 text-5xl font-serif text-charcoal/10 select-none pointer-events-none">
                    "
                </span>

                <p
                    className={cn(
                        "text-2xl md:text-3xl font-light text-charcoal text-center max-w-2xl leading-relaxed transition-all duration-400 ease-out",
                        isAnimating ? "opacity-0 blur-sm scale-[0.98]" : "opacity-100 blur-0 scale-100",
                    )}
                >
                    {displayedQuote}
                </p>

                <span className="absolute -right-2 -bottom-6 text-5xl font-serif text-charcoal/10 select-none pointer-events-none">
                    "
                </span>
            </div>

            <div className="flex flex-col items-center gap-6 mt-2">
                {/* Role text */}
                <p
                    className={cn(
                        "text-xs text-charcoal/60 tracking-[0.2em] uppercase transition-all duration-500 ease-out",
                        isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0",
                    )}
                >
                    {displayedRole}
                </p>

                <div className="flex items-center justify-center gap-2">
                    {testimonials.map((testimonial, index) => {
                        const isActive = activeIndex === index
                        const isHovered = hoveredIndex === index && !isActive
                        const showName = isActive || isHovered

                        return (
                            <button
                                key={testimonial.id}
                                onClick={() => handleSelect(index)}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className={cn(
                                    "relative flex items-center gap-0 rounded-full cursor-pointer",
                                    "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                                    isActive ? "bg-charcoal shadow-lg" : "bg-transparent hover:bg-gray-100",
                                    showName ? "pr-4 pl-2 py-2" : "p-0.5",
                                )}
                            >
                                {/* Avatar with smooth ring animation */}
                                <div className="relative flex-shrink-0">
                                    <img
                                        src={testimonial.avatar || "/placeholder.svg"}
                                        alt={testimonial.author}
                                        className={cn(
                                            "w-8 h-8 rounded-full object-cover",
                                            "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                                            isActive ? "ring-2 ring-white/30" : "ring-0",
                                            !isActive && "hover:scale-105",
                                        )}
                                    />
                                </div>

                                <div
                                    className={cn(
                                        "grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                                        showName ? "grid-cols-[1fr] opacity-100 ml-2" : "grid-cols-[0fr] opacity-0 ml-0",
                                    )}
                                >
                                    <div className="overflow-hidden">
                                        <span
                                            className={cn(
                                                "text-sm font-medium whitespace-nowrap block",
                                                "transition-colors duration-300",
                                                isActive ? "text-white" : "text-charcoal",
                                            )}
                                        >
                                            {testimonial.author}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
