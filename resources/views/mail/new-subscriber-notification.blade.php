<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Waitlist Signup</title>
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
                                New Waitlist Signup
                            </h1>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 0 40px 30px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 16px; line-height: 1.6; color: #706f6c;">
                                <tr>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #e3e3e0;">
                                        <strong style="color: #1b1b18;">Email:</strong>
                                    </td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #e3e3e0; text-align: right;">
                                        {{ $subscriber->email }}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #e3e3e0;">
                                        <strong style="color: #1b1b18;">Source:</strong>
                                    </td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #e3e3e0; text-align: right;">
                                        {{ $subscriber->source }}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0;">
                                        <strong style="color: #1b1b18;">Signed up:</strong>
                                    </td>
                                    <td style="padding: 8px 0; text-align: right;">
                                        {{ $subscriber->created_at->format('M j, Y \a\t g:i A') }}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Stats -->
                    <tr>
                        <td style="padding: 0 40px 30px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f4; border-radius: 8px;">
                                <tr>
                                    <td style="padding: 16px; text-align: center; width: 33%;">
                                        <div style="font-size: 24px; font-weight: 600; color: #1b1b18;">{{ $totalSignups }}</div>
                                        <div style="font-size: 12px; color: #706f6c; text-transform: uppercase;">Total</div>
                                    </td>
                                    <td style="padding: 16px; text-align: center; width: 33%; border-left: 1px solid #e3e3e0; border-right: 1px solid #e3e3e0;">
                                        <div style="font-size: 24px; font-weight: 600; color: #1b1b18;">{{ $signupsThisWeek }}</div>
                                        <div style="font-size: 12px; color: #706f6c; text-transform: uppercase;">This Week</div>
                                    </td>
                                    <td style="padding: 16px; text-align: center; width: 33%;">
                                        <div style="font-size: 24px; font-weight: 600; color: #1b1b18;">{{ $signupsToday }}</div>
                                        <div style="font-size: 12px; color: #706f6c; text-transform: uppercase;">Today</div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 40px; border-top: 1px solid #e3e3e0; text-align: center;">
                            <p style="margin: 0; font-size: 12px; color: #a1a09a;">
                                &copy; {{ date('Y') }} Carl Weis
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
