<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Mail\SubscriptionExpiryNotice;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

class SendSubscriptionExpiryNotifications extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notify:subscriptions';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send email notifications to users whose subscriptions are expiring soon.';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Scanning for subscriptions expiring within 7 days...');

        $now = Carbon::now();
        $limit = $now->copy()->addDays(7);

        $users = User::whereNotNull('subscription_expiry')
            ->where('is_active', true)
            ->whereBetween('subscription_expiry', [$now->toDateTimeString(), $limit->toDateTimeString()])
            ->get();

        $this->info('Found: ' . $users->count());

        foreach ($users as $user) {
            try {
                $expiry = Carbon::parse($user->subscription_expiry);
                $daysLeft = max(0, $expiry->diffInDays($now));

                Mail::to($user->email)->send(new SubscriptionExpiryNotice($user, $daysLeft));

                $this->info("Notified: {$user->email} ({$daysLeft} days left)");
            } catch (\Exception $e) {
                $this->error("Failed to notify {$user->email}: " . $e->getMessage());
            }
        }

        return 0;
    }
}
