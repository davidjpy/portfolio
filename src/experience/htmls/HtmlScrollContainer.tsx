import { useEffect, useRef, forwardRef } from 'react'

interface Props extends React.ComponentProps<'section'> {
    top: number
    position: 'left' | 'right'
    backgroundTitle: string
    topTitle: string
    bottomTitle: JSX.Element
    isMobile: boolean
    contentObserverRef: React.MutableRefObject<IntersectionObserver | null>
    children: React.ReactNode
}

const HtmlScrollContainer = forwardRef<HTMLElement, Props>(
    (
        { top, position, backgroundTitle, topTitle, bottomTitle, isMobile, contentObserverRef, children, ...props },
        ref
    ) => {
        const containerHeaderRef = useRef<HTMLHeadElement>(null)

        useEffect(() => {
            if (containerHeaderRef.current) {
                contentObserverRef.current?.observe(containerHeaderRef.current)
            }

            return () => {
                if (containerHeaderRef.current) {
                    contentObserverRef.current?.unobserve(containerHeaderRef.current)
                }
            }
        }, [containerHeaderRef.current])

        return (
            <section
                data-position={position}
                className='scroll-text-box'
                style={{
                    top: top,
                    right: position === 'right' ? 0 : undefined,
                    width: isMobile ? '100%' : '50%'
                }}
                ref={ref}
                {...props}
            >
                <header data-name='ch' ref={containerHeaderRef} className='relative  mb-12'>
                    <h1 className='pointer-events-none absolute -top-[140px] left-[160px] -z-50 translate-x-[40px] text-[250px] font-black text-primary-monochrome opacity-0 [transition:transform_0.4s_ease-out,opacity_0.4s_ease-out]'>
                        {backgroundTitle}
                    </h1>
                    <div className='header-divider mb-4 h-2 w-0 bg-accent transition-[width] duration-[0.4s] ease-out' />
                    <h1 className='hidden-content text-xl font-bold text-secondary [transition:transform_0.4s_ease-out_0.2s,opacity_0.4s_ease-out_0.2s] sm:text-2xl'>
                        {topTitle}
                    </h1>
                    <div className='hidden-content text-3xl font-black text-secondary [transition:transform_0.4s_ease-out_0.2s,opacity_0.4s_ease-out_0.2s] sm:text-4xl'>
                        {bottomTitle}
                    </div>
                </header>
                {children}
            </section>
        )
    }
)

export default HtmlScrollContainer
