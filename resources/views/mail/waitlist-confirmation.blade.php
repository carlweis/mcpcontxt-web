<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>You're on the list!</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f4;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f4;">
        <tr>
            <td style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 30px; text-align: center;">
                            <img src="{{ url('images/app-icon.png') }}" alt="MCP Contxt" width="64" height="64" style="border-radius: 12px;">
                            <h1 style="margin: 20px 0 0; font-size: 24px; font-weight: 600; color: #1b1b18;">
                                You're on the list!
                            </h1>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 0 40px 30px;">
                            <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #706f6c; text-align: center;">
                                Thanks for signing up! You've joined <strong style="color: #1b1b18;">{{ number_format($waitlistCount) }}</strong> {{ $waitlistCount === 1 ? 'person' : 'others' }} waiting for MCP Contxt.
                            </p>

                            <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #706f6c; text-align: center;">
                                We'll send you an email as soon as the app is ready to download.
                            </p>

                            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #a1a09a; text-align: center;">
                                MCP Contxt is a macOS menu bar app that makes it easy to manage MCP servers for Claude Code.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 40px; border-top: 1px solid #e3e3e0; text-align: center;">
                            <p style="margin: 0; font-size: 12px; color: #a1a09a;">
                                &copy; {{ date('Y') }} OpcodeZero
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
