<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Subscription Expiry Notice</title>
  </head>
  <body style="font-family: Arial, sans-serif; color: #333;">
    <div style="max-width:600px; margin:0 auto; padding:20px;">
      <h2 style="color:#e53637;">Subscription expiring soon</h2>
      <p>Hi {{ $user->name }},</p>
      <p>We wanted to let you know that your GymLife subscription will expire in <strong>{{ $daysLeft }} day{{ $daysLeft != 1 ? 's' : '' }}</strong>.</p>
      <p>If you'd like to avoid interruption, please renew your subscription from your dashboard.</p>
      <p style="margin-top:24px;">Thanks,<br/>The GymLife Team</p>
    </div>
  </body>
</html>
