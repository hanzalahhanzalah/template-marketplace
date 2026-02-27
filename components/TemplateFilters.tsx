'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './TemplateFilters.module.css';

interface TemplateFiltersProps {
    categories: string[];
    baseUrl: string;
}

export default function TemplateFilters({ categories, baseUrl }: TemplateFiltersProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentCategory = searchParams.get('category') || 'All';
    const currentQuery = searchParams.get('q') || '';

    const [searchQuery, setSearchQuery] = useState(currentQuery);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams);
            if (searchQuery) {
                params.set('q', searchQuery);
            } else {
                params.delete('q');
            }
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, pathname, router, searchParams]);

    const handleCategoryClick = (category: string) => {
        const params = new URLSearchParams(searchParams);
        if (category === 'All') {
            params.delete('category');
        } else {
            params.set('category', category.toLowerCase());
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className={styles.filterBar}>
            <div className={styles.categories}>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`${styles.categoryBtn} ${(cat === 'All' && currentCategory === 'All') ||
                            cat.toLowerCase() === currentCategory.toLowerCase()
                            ? styles.active : ''
                            }`}
                        onClick={() => handleCategoryClick(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            <div className={styles.search}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                    type="text"
                    placeholder="Search templates..."
                    className={styles.searchInput}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
    );
}
