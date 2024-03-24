import React from 'react'

export default function ShareButton({ title, url }: { title: string, url: string }) {
    const handleClick = async () => {
        try {
            await navigator.share({ title, url });
            console.log('Content shared successfully');
        } catch (error) {
            console.error('Error sharing content:', error);
        }
    };
    return (
        <div>

        </div>
    )
}
