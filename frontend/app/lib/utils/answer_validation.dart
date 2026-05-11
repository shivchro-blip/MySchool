import 'dart:math';

class AnswerValidationResult {
  final bool valid;
  final String? reason;
  final String? message;
  const AnswerValidationResult({required this.valid, this.reason, this.message});
}

AnswerValidationResult validateStudentAnswer(String answer) {
  final trimmed = answer.trim();
  if (trimmed.isEmpty) {
    return const AnswerValidationResult(valid: false, reason: 'empty', message: null);
  }
  if (trimmed.length < 10) {
    return const AnswerValidationResult(
      valid: false, reason: 'too_short',
      message: 'Please write a little more before submitting.',
    );
  }

  final lower = trimmed.toLowerCase();
  final compact = lower.replaceAll(RegExp(r'\s+'), '');
  final letterOnly = lower.replaceAll(RegExp(r'[^a-z]'), '');
  final letterCount = letterOnly.length;
  final compactLen = compact.length;

  // Mostly non-alphabetic
  if (compactLen > 5 && letterCount / compactLen < 0.4) {
    return const AnswerValidationResult(
      valid: false, reason: 'gibberish',
      message: 'Please write a meaningful answer before submitting.',
    );
  }

  // Single character dominance
  if (letterCount > 5) {
    final freq = <String, int>{};
    for (final c in letterOnly.split('')) {
      freq[c] = (freq[c] ?? 0) + 1;
    }
    final maxFreq = freq.values.reduce((a, b) => a > b ? a : b);
    if (maxFreq / letterCount > 0.6) {
      return const AnswerValidationResult(
        valid: false, reason: 'gibberish',
        message: 'Please write a meaningful answer before submitting.',
      );
    }
  }

  // Very few distinct letters for a long string (e.g. "asdfasdf…" uses only a,s,d,f)
  if (letterCount >= 15) {
    final uniqueLetters = letterOnly.split('').toSet().length;
    if (uniqueLetters <= 4) {
      return const AnswerValidationResult(
        valid: false, reason: 'gibberish',
        message: 'Please write a meaningful answer before submitting.',
      );
    }
  }

  // Repeating chunk pattern — scan all starting positions so "asdfasdf…" starting mid-string is caught
  if (compactLen >= 6) {
    final maxChunkLen = min(8, compactLen ~/ 2);
    for (int len = 2; len <= maxChunkLen; len++) {
      final seen = <String>{};
      for (int start = 0; start <= compactLen - len; start++) {
        final chunk = compact.substring(start, start + len);
        if (!RegExp(r'[a-z]').hasMatch(chunk) || seen.contains(chunk)) continue;
        seen.add(chunk);
        int count = 0, pos = 0;
        while (pos <= compactLen - len) {
          if (compact.substring(pos, pos + len) == chunk) {
            count++;
            pos += len;
          } else {
            pos++;
          }
        }
        if (count >= 2 && count * len / compactLen > 0.5) {
          return const AnswerValidationResult(
            valid: false, reason: 'gibberish',
            message: 'Please write a meaningful answer before submitting.',
          );
        }
      }
    }
  }

  // Very low vowel ratio
  if (letterCount >= 8) {
    final vowelCount = RegExp(r'[aeiou]').allMatches(letterOnly).length;
    if (vowelCount / letterCount < 0.05) {
      return const AnswerValidationResult(
        valid: false, reason: 'gibberish',
        message: 'Please write a meaningful answer before submitting.',
      );
    }
  }

  return const AnswerValidationResult(valid: true, reason: null, message: null);
}
