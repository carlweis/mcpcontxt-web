<!DOCTYPE html>
<html lang="en" class="dark">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Link Expired - {{ config('app.name') }}</title>

        <script>
            (function() {
                const appearance = localStorage.getItem('appearance');
                if (appearance === 'light') {
                    document.documentElement.classList.remove('dark');
                } else if (appearance === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            })();
        </script>

        <style>
            html {
                background-color: oklch(1 0 0);
            }
            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
                darkMode: 'class',
                theme: {
                    extend: {
                        fontFamily: {
                            sans: ['Instrument Sans', 'system-ui', 'sans-serif'],
                        },
                    },
                },
            };
        </script>
    </head>
    <body class="font-sans antialiased bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
        <div class="min-h-screen flex flex-col items-center justify-center px-6">
            <div class="text-center max-w-md">
                <a href="/" class="inline-block mb-8">
                    <img
                        src="/images/app-icon.png"
                        alt="{{ config('app.name') }}"
                        class="size-16 rounded-2xl mx-auto"
                    />
                </a>

                <h1 class="text-8xl font-semibold text-neutral-300 dark:text-neutral-700 mb-4">
                    403
                </h1>

                <h2 class="text-2xl font-medium mb-3">
                    Link expired or invalid
                </h2>

                <p class="text-neutral-600 dark:text-neutral-400 mb-8">
                    This download link has expired or is no longer valid. Request a new download link from the homepage.
                </p>

                <a
                    href="/"
                    class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" x2="12" y1="15" y2="3"/>
                    </svg>
                    Get new download link
                </a>
            </div>

            <footer class="absolute bottom-6 text-sm text-neutral-500 dark:text-neutral-500">
                &copy; {{ date('Y') }} OpcodeZero
            </footer>
        </div>
    </body>
</html>
