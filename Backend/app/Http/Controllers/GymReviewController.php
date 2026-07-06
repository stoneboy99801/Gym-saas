<?php

namespace App\Http\Controllers;

use App\Models\CheckIn;
use App\Models\Gym;
use App\Models\GymReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GymReviewController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $visitedGymIds = CheckIn::where('user_id', $userId)
            ->select('gym_id')
            ->distinct()
            ->pluck('gym_id');

        $gyms = Gym::query()
            ->whereIn('id', $visitedGymIds)
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->with(['reviews' => fn ($query) => $query->where('user_id', $userId)])
            ->orderBy('gym_name')
            ->get()
            ->map(function (Gym $gym) {
                $myReview = $gym->reviews->first();

                return [
                    'gym_id' => $gym->id,
                    'gym_name' => $gym->gym_name,
                    'area' => $gym->area,
                    'average_rating' => $gym->reviews_avg_rating ? round((float) $gym->reviews_avg_rating, 1) : null,
                    'reviews_count' => $gym->reviews_count,
                    'my_review' => $myReview ? [
                        'rating' => $myReview->rating,
                        'comment' => $myReview->comment,
                    ] : null,
                ];
            });

        return response()->json([
            'status' => 'success',
            'data' => $gyms,
        ]);
    }

    public function store(Request $request, Gym $gym)
    {
        $data = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:500',
        ]);

        $userId = $request->user()->id;

        $hasVisited = CheckIn::where('user_id', $userId)
            ->where('gym_id', $gym->id)
            ->exists();

        if (!$hasVisited) {
            return response()->json([
                'status' => 'error',
                'message' => 'You can review only gyms you have visited.',
            ], 403);
        }

        $review = DB::transaction(function () use ($data, $userId, $gym) {
            return GymReview::updateOrCreate(
                ['user_id' => $userId, 'gym_id' => $gym->id],
                ['rating' => $data['rating'], 'comment' => $data['comment'] ?? null]
            );
        });

        return response()->json([
            'status' => 'success',
            'message' => 'Review saved successfully.',
            'data' => $review,
        ]);
    }
}
