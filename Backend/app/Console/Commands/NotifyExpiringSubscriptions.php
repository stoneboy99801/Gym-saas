<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use Carbon\Carbon;

class NotifyExpiringSubscriptions extends Command
{
    protected $signature   = 'subscriptions:notify';
    protected $description = 'Email members whose subscription expires within 3 days';

    public function handle(): void
    {
        $soon = Carbon::now()->addDays(3);

        $members = User::where('role', 'member')
            ->where('is_active', true)
            ->whereNotNull('subscription_expiry')
            ->whereDate('subscription_expiry', '<=', $soon)
            ->whereDate('subscription_expiry', '>=', Carbon::today())
            ->get();

        if ($members->isEmpty()) {
            $this->info('No expiring subscriptions found.');
            return;
        }

        foreach ($members as $member) {
            $expiry    = Carbon::parse($member->subscription_expiry);
            $daysLeft  = (int) Carbon::now()->diffInDays($expiry, false);
            $daysLeft  = max(0, $daysLeft);

            Mail::raw(
                "Hi {$member->name},\n\n" .
                "Your GymLife {$member->tier} membership expires in {$daysLeft} day(s) on {$expiry->format('d M Y')}.\n\n" .
                "Renew now to keep your gym access uninterrupted.\n\n" .
                "— GymLife Team",
                function ($message) use ($member, $daysLeft) {
                    $message->to($member->email)
                            ->subject("GymLife — Your membership expires in {$daysLeft} day(s)");
                }
            );

            $this->info("Notified: {$member->email} ({$daysLeft} days left)");
        }

        $this->info("Done. {$members->count()} member(s) notified.");
    }
}
